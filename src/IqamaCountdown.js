import React, { useEffect, useState } from "react";
import moment from "moment";

export default function IqamaCountdown({ prayerTime }) {
  const iqamaDuration = 15 * 60; // 15 دقيقة بالثواني
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    const check = () => {
      const now = moment();
      const prayerMoment = moment(prayerTime, "HH:mm");
      const secondsSinceAdhan = now.diff(prayerMoment, "seconds");

      if (secondsSinceAdhan >= 0 && secondsSinceAdhan <= iqamaDuration) {
        setRemaining(iqamaDuration - secondsSinceAdhan);
      } else {
        setRemaining(null); // قبل الأذان أو بعد الإقامة
      }
    };

    check();
    const timer = setInterval(check, 1000);
    return () => clearInterval(timer);
  }, [prayerTime]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (remaining > 0) {
        setRemaining((prev) => prev - 1);
      }
    }, 1000);

    if (remaining === null || remaining <= 0) {
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [remaining]);

  const minutes = remaining !== null ? Math.floor(remaining / 60) : 0;
  const seconds = remaining !== null ? remaining % 60 : 0;

  return (
    <div style={{ marginTop: "10px", textAlign: "center", color: "orange" }}>
      <p>الإقامة بعد:</p>
      <h4>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h4>
      {remaining === 0 && <p>🌙 حان وقت الإقامة</p>}
    </div>
  );
}
