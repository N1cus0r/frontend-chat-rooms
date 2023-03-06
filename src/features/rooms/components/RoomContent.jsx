import React from "react";
import { Box, Divider, Grid, LinearProgress, Paper } from "@mui/material";
import CenteredBox from "../../../layouts/CenteredBox";
import CenteredGridContainer from "../../../layouts/CenteredGridContainer";
import RoomInfo from "./RoomInfo";
import RoomInput from "./RoomInput";
import RoomMessages from "./RoomMessages";

const RoomContent = ({
  room,
  messages,
  message,
  loading,
  bottomMessageRef,
  setMessage,
  sendMessage,
  emitLeaveRoomEvent,
}) => {
  return (
    <CenteredBox>
      <CenteredGridContainer>
        <Grid item>
          <Paper elevation={8} sx={{ borderRadius: 10 }}>
            <Box p={2}>
              <RoomInfo
                code={room.code}
                participants={room.participants_ids.length}
                maxParticipants={room.max_participants}
                emitLeaveRoomEvent={emitLeaveRoomEvent}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={8} sx={{ borderRadius: 10 }}>
            <Box p={2}>
              <Grid
                container
                direction="column"
                spacing={2}
                display="flex"
                justifyContent="center"
                textAlign="center"
              >
                <Grid item>
                  <RoomMessages
                    messages={messages}
                    bottomMessageRef={bottomMessageRef}
                  />
                </Grid>
                <Grid item>
                  <Divider />
                </Grid>
                <Grid item>
                  <RoomInput
                    message={message}
                    loading={loading}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        {loading && (
          <Grid item sx={{ width: 280 }}>
            <LinearProgress color="primary" />
          </Grid>
        )}
      </CenteredGridContainer>
    </CenteredBox>
  );
};

export default RoomContent;
