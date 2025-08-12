import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IqamaCountdown from "./IqamaCountdown"; // ✅ استيراد العداد

export default function MediaCard({ name, time, iamg }) {
  return (
    <Card sx={{ width: "230px" }}>
      <img
        src={iamg}
        alt="Ramadan"
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover", // شكل مناسب للصورة
        }}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {time}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          <IqamaCountdown prayerTime={time} />
        </Typography>
      </CardContent>
    </Card>
  );
}
