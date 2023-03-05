import { Grid } from "@mui/material";
import React from "react";

const CenteredGridContainer = ({ children }) => {
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      {children}
    </Grid>
  );
};

export default CenteredGridContainer;
