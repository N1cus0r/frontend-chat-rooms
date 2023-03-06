import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Scrollbars from "react-custom-scrollbars";
import useTheme from "../../../hooks/useTheme";
import RoomEventMessage from "./RoomEventMessage";
import RoomMessage from "./RoomMessage";

const RoomMessages = ({ messages, bottomMessageRef }) => {
  const { isMobile } = useTheme();

  return (
    <Box width={isMobile ? 350 : 600} height={isMobile ? 300 : 600}>
      <Scrollbars
        autoHeight
        autoHeightMin={isMobile ? 316 : 616}
        autoHeightMax={isMobile ? 316 : 616}
      >
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
