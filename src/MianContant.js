import react from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CardPreyer from "./CardPreyer";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ar";
import PrayerCountdown from "./Timeout";

export default function MianContant() {
  function subtract12Hours(time24) {
    const [hourStr, minute] = time24.split(":");
    let hour = parseInt(hourStr);

    if (hour > 12) {
      hour -= 12;
    }

    return `${hour}:${minute}`;
  }
  const today = moment();
  moment.locale("en");
  const date = moment().format("YYYY-MM-DD");
  moment.locale("ar");
  const daydata = today.format("dddd");
  const month = moment().format("MMMM");

  const getTimgs = async () => {
    const data = await axios.get(
      "https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=5"
    );
    settimaing(data.data.data.timings);
  };
  useEffect(() => {
    getTimgs();
  }, []);
  const [timaing, settimaing] = useState({
    Fajr: "04:07",
    Sunrise: "05:54",
    Dhuhr: "12:56",
    Asr: "16:32",
    Sunset: "19:59",
    Maghrib: "19:59",
    Isha: "21:32",
  });

  const [day] = useState({
    ar: "ذوالحجة",
    days: 29,
    number: 12,
  });

  const [yaer] = useState("1446");

  function getNextPrayer(timings) {
    const now = moment();

    const prayers = [
      { name: "الفجر", time: timings.Fajr },
      { name: "الضحي", time: timings.Sunrise },
      { name: "الظهر", time: timings.Dhuhr },
      { name: "العصر", time: timings.Asr },
      { name: "المغرب", time: timings.Maghrib },
      { name: "العشاء", time: timings.Isha },
    ];

    for (let i = 0; i < prayers.length; i++) {
      const prayerTime = moment(prayers[i].time, "HH:mm");
      if (now.isBefore(prayerTime)) {
        return prayers[i];
      }
    }

    // لو كل الصلوات عدّت، نرجّع الفجر بتاع بكرة
    return prayers[0];
  }

  const nextPrayer = timaing && getNextPrayer(timaing);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "270px",
          color: "white",
        }}
      >
        <div>
          <h2 style={{ marginBottom: "15px" }}>
            {" "}
            {month} |{date}
          </h2>
          <h2 style={{ marginBottom: "15px" }}>
            {day.ar} | {day.days}-{day.number}-{yaer}
          </h2>
          <h2>القاهرة</h2>
        </div>

        <div>
          {/* <h2 style={{ marginBottom: "15px" }}>
            الوقت المتبقي للصلاة القادمة{" "}
          </h2>
          <h2>02:22:00</h2> */}
          <PrayerCountdown
            prayerName={nextPrayer.name}
            prayerTime={nextPrayer.time}
          />
          <h1 style={{ fontSize: "30px", marginTop: "20px" }}>{daydata}</h1>
        </div>
      </div>{" "}
      {/* <hr
        style={{
          marginTop: "10px",
          color: "gray",
        }}
      /> */}
      <Divider
        style={{ borderColor: "white", marginTop: "15px", opacity: "0.7" }}
      ></Divider>
      <Stack
        direction="row"
        style={{ marginTop: "50px" }}
        justifyContent={"space-around"}
      >
        <CardPreyer
          name="الفجر"
          time={subtract12Hours(timaing.Fajr)}
          iamg="/img/concept-ramadan-tradition_23-2151929221.avif"
        />
        <CardPreyer
          name="الضحي"
          time={subtract12Hours(timaing.Sunrise)}
          iamg="\img\download.jpg"
        />
        <CardPreyer
          name="الظهر"
          time={subtract12Hours(timaing.Dhuhr)}
          iamg="/img/concept-ramadan-tradition_23-2151929211.avif"
        />
        <CardPreyer
          name="العصر"
          time={subtract12Hours(timaing.Asr)}
          iamg="\img\concept-ramadan-tradition_23-2151929217.avif"
        />
        <CardPreyer
          name="المغرب"
          time={subtract12Hours(timaing.Maghrib)}
          iamg="\img\concept-ramadan-tradition_23-2151929246.avif"
        />
        <CardPreyer
          name="العشاء"
          time={subtract12Hours(timaing.Isha)}
          iamg="\img\muslim-performing-his-daily-prayer-light-coming-through-window_796959-653.avif"
        />
      </Stack>
      {/* <select
        style={{
          marginTop: "30px",
          width: "200px",
          height: "40px",
          border: "none",
          borderRadius: "5px",
          fontSize: "25px",
          cursor: "pointer",
        }}
      >
        <option value={}>القاهرة</option>
        <option>كفر الشيخ </option>
        <option>اسوان</option>
      </select> */}
    </>
  );
}
