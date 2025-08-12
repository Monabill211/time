import React, { useEffect, useState } from "react";
import moment from "moment";

function getTimeRemaining(targetTime) {
  const now = moment();
  let target = moment(targetTime, "HH:mm");

  if (target.isBefore(now)) {
    target.add(1, "day");
  }

  const diff = moment.duration(target.diff(now));

  return {
    hours: diff.hours(),
    minutes: diff.minutes(),
    seconds: diff.seconds(),
  };
}

export default function PrayerCountdown({ prayerName, prayerTime }) {
  const [remaining, setRemaining] = useState(getTimeRemaining(prayerTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getTimeRemaining(prayerTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTime]);

  return (
    <div>
      <h3>{prayerName}</h3>
      <p>
        {remaining.hours} ساعة، {remaining.minutes} دقيقة، {remaining.seconds}{" "}
        ثانية
      </p>
    </div>
  );
}
