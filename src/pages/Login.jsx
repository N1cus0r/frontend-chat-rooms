import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, LinearProgress } from "@mui/material";
import { Validators } from "../utils/Validators";
import LoginForm from "../features/auth/forms/LoginForm";
import RegisterForm from "../features/auth/forms/RegisterForm";
import useAuth from "../hooks/useAuth";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

const Login = () => {
  const [formType, setFormType] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { registerUser, loginUser } = useAuth();

  const clearForms = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleFormChange = (e, formType) => {
    setFormType(formType);
  };

  const handleLoginFormSubmit = async () => {
    const isFormValid = Validators.isFormFilled(email, password);
    if (!isFormValid) {
      setErrorMessage("Please fill in the form");
      return;
    }

    await loginUser(email, password, setErrorMessage, setLoading);
    clearForms();
  };

  const handleRegisterFormSubmit = async () => {
    const isFormValid = Validators.isFormFilled(username, email, password);
    if (!isFormValid) {
      setErrorMessage("Please fill in the form");
      return;
    }

    await registerUser(
      username,
      email,
      password,
      setErrorMessage,
      setMessage,
      setLoading
    );
    clearForms();
  };

  return (
    <Grid
      container
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      direction="column"
      spacing={1}
    >
      <Grid item>
        <TabContext value={formType}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleFormChange} variant="fullWidth">
              <Tab label="Login" value="login" />
              <Tab label="Register" value="register" />
            </TabList>
          </Box>
          <TabPanel value="login">
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              errorMessage={errorMessage}
              message={message}
              loading={loading}
              setLoading={setLoading}
              setPassword={setPassword}
              setErrorMessage={setErrorMessage}
              handleFormSubmit={handleLoginFormSubmit}
            />
          </TabPanel>
          <TabPanel value="register">
            <RegisterForm
              email={email}
              username={username}
              password={password}
              errorMessage={errorMessage}
              message={message}
              loading={loading}
              setLoading={setLoading}
              setEmail={setEmail}
              setUsername={setUsername}
              setPassword={setPassword}
              setErrorMessage={setErrorMessage}
              handleFormSubmit={handleRegisterFormSubmit}
            />
          </TabPanel>
        </TabContext>
      </Grid>
      {loading && (
        <Grid item sx={{ width: 280 }}>
          <LinearProgress color="primary" />
        </Grid>
      )}
    </Grid>
  );
};

export default Login;
