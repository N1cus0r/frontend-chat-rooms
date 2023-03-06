import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

const Navbar = () => {
  const navigate = useNavigate();

  const { logoutUser } = useAuth();
  const isAuthenticated = Boolean(LocalStorageAPI.getLocalStorageToken());

  const [mode, changeColorMode] = useTheme();

  // console.log(mode);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          edge="start"
          onClick={() => navigate("/")}
        >
          <ForumIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          sx={{
            color: "inherit",
            textDecoration: "none",
            fontFamily: "monospace",
          }}
          onClick={() => navigate("/")}
        >
          Chatty Rooms
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            marginLeft: "auto",
            alignItems: "center",
          }}
        >
          <Tooltip
            title={
              mode === "light" ? "Turn off the light" : "Turn on the light"
            }
          >
            <IconButton
              size="large"
              color="inherit"
              edge="start"
              onClick={changeColorMode}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
          {isAuthenticated && (
            <Typography
              variant="h6"
              noWrap
              sx={{
                color: "inherit",
                textDecoration: "none",
                fontFamily: "monospace",
              }}
              onClick={async () => await logoutUser()}
            >
              Logout
            </Typography>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
