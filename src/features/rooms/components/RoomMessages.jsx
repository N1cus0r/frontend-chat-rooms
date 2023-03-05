import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Scrollbars from "react-custom-scrollbars";
import RoomEventMessage from "./RoomEventMessage";
import RoomMessage from "./RoomMessage";

const RoomMessages = ({ messages, bottomMessageRef }) => {
  return (
    <Box width={600} height={600}>
      <Scrollbars autoHeight autoHeightMin={616} autoHeightMax={616}>
        <Grid container direction="column" spacing={1}>
          {messages &&
            messages.map((message) =>
              message.user_id ? (
                <RoomMessage message={message} key={message._id} />
              ) : (
                <RoomEventMessage message={message} key={message._id} />
              )
            )}
          <div ref={bottomMessageRef} />
        </Grid>
      </Scrollbars>
    </Box>
  );
};

export default RoomMessages;
