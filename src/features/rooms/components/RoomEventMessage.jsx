import React from "react";
import { Grid, Typography } from "@mui/material";

const RoomEventMessage = ({ message }) => {
  const messageTime = new Date(
    Date.parse(message.time_sent)
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const [messageUsername, ...messageText] = message.text.split(" ");

  return (
    <Grid item textAlign="center" alignItems="center">
      <Typography color="secondary" variant="body1">
        {messageTime} : <strong>{messageUsername} </strong>
        {messageText.join(" ")}
      </Typography>
    </Grid>
  );
};

export default RoomEventMessage;
