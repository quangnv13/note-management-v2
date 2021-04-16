import React, { useContext, useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { AppContext } from "../context/AppContext";
import { AUTH } from "../const/actionsConst";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://quangnguyen.info/">
        Quang Nguyễn
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(AppContext);
  const { appState, appDispatch } = context;
  const { isValidUsername, isValidPassword } = appState;

  const userNameInput = (event) => {
    if (event.target.value) {
      setUsername(event.target.value);
      appDispatch({
        type: AUTH.ISVALID_USERNAME,
        data: { isValid: true },
      });
    } else {
      appDispatch({
        type: AUTH.ISVALID_USERNAME,
        data: { isValid: false },
      });
    }
  };

  const passwordInput = (event) => {
    if (event.target.value) {
      setPassword(event.target.value);
      appDispatch({
        type: AUTH.ISVALID_PASSWORD,
        data: { isValid: true },
      });
    } else {
      appDispatch({
        type: AUTH.ISVALID_PASSWORD,
        data: { isValid: false },
      });
    }
  };

  const btnLoginClick = (event) => {
    event.preventDefault();
    appDispatch({
      type: AUTH.LOGIN,
      data: {
        username,
        password,
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <img
          className="m-auto d-flex"
          alt="Sign in icon"
          height="100px"
          src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/user-512.png"
        ></img>
        <Typography component="h1" variant="h5" className="text-center">
          Log in
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            error={!isValidUsername}
            onInput={userNameInput}
            autoComplete="username"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            autoComplete="current-password"
            type="password"
            id="password"
            error={!isValidPassword}
            onInput={passwordInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={btnLoginClick}
            disabled={!(isValidUsername && isValidPassword)}
          >
            Login
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
