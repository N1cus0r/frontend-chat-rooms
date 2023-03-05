import { Box } from "@mui/material";
import React from "react";

const CenteredBox = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default CenteredBox;
