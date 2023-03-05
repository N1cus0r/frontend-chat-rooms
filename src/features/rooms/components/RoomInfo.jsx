import React from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import useRoom from "../../../hooks/useRoom";

const RoomInfo = ({
  code,
  participants,
  maxParticipants,
  emitLeaveRoomEvent,
}) => {
  const { leaveRoom } = useRoom();
  const handleClick = async () => {
    await leaveRoom(code);
    await emitLeaveRoomEvent();
  };
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      display="flex"
      justifyContent="center"
      textAlign="center"
    >
      <Grid item>
        <Stack direction="column">
          <Typography variant="h5">{code}</Typography>
          <Typography variant="body2" color="secondary">
            You share can this code with others
          </Typography>
        </Stack>
      </Grid>
      <Grid item>
        <Divider flexItem variant="middle" />
      </Grid>
      <Grid item>
        <Stack direction="column">
          <Typography variant="h5">
            Participants: {participants} / {maxParticipants}
          </Typography>
          <Typography color="secondary" variant="body2">
            This room will be deleted after the host leaves
          </Typography>
        </Stack>
      </Grid>
      <Grid item>
        <Divider flexItem variant="middle" />
      </Grid>
      <Grid item>
        <Button fullWidth onClick={handleClick}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomInfo;
