import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../../hooks/useAuth";

const RoomMessage = ({ message }) => {
  const { user } = useAuth();
  const messagePlacement = message.user_id === user.id ? "left" : "right";
  const messageMarginLeft = message.user_id === user.id && 2;
  const messageMarginRight = message.user_id !== user.id && 2;
  const messageUsername =
    message.user_id === user.id ? "You" : message.user_username;
  const messageTime = new Date(
    Date.parse(message.time_sent)
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <Grid item display="flex" justifyContent={messagePlacement} mb={1}>
      <Paper
        sx={{
          marginLeft: messageMarginLeft,
          marginRight: messageMarginRight,
          maxWidth: 350,
          borderRadius: 5,
        }}
        elevation={5}
      >
        <Grid container textAlign="left" direction="column" p={1}>
          <Grid item>
            <Typography variant="body2">
              {message.user_id && <strong>{messageUsername}</strong>}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="body1">{message.text}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="secondary" component="span">
                  {messageTime}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default RoomMessage;
