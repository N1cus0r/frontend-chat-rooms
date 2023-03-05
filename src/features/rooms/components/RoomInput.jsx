import React from "react";
import { IconButton, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";

const RoomInput = ({ message, setMessage, sendMessage }) => {
  return (
    <Stack direction="row" spacing={2}>
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        label="Write Something "
        variant="filled"
      />
      <IconButton
        color="primary"
        onClick={sendMessage}
        disabled={!Boolean(message)}
      >
        <SendIcon />
      </IconButton>
    </Stack>
  );
};

export default RoomInput;
