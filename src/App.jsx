import React, { useRef, useContext } from "react";
import "./App.css";
import Login from "./components/login/Login";
import Note from "./components/notes/Note";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { AUTH, CONTROL } from "./actionsConst";
import { AppContext } from "./AppContext";

function App() {
  const context = useContext(AppContext);

  const { appState, appDispatch } = context;

  const { isLogged, isShowNotify, notifyMessage, notifyType } = appState;

  const loginComponentRef = useRef();

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const onHideNotify = () => {
    appDispatch({ type: CONTROL.HIDE_NOTIFY });
  };

  const btnLoginClick = (username, password) => {
    appDispatch({ type: AUTH.LOGIN, data: { username, password } });
    // showNotify("Login error! Please check your credentials!", "error");
    // loginComponentRef.current.loginResponse(false);
  };

  const btnLogoutClick = () => {
    appDispatch({ type: AUTH.LOGOUT });
  };

  const showLoginForm = !isLogged ? (
    <Login
      ref={loginComponentRef}
      btnLoginClick={btnLoginClick}
      loginResponse={isLogged}
    ></Login>
  ) : (
    <Note btnLogoutClick={btnLogoutClick}></Note>
  );

  return (
    <div>
      {showLoginForm}
      <Snackbar
        open={isShowNotify}
        autoHideDuration={3000}
        onClose={onHideNotify}
      >
        <Alert severity={notifyType} onClose={onHideNotify}>
          {notifyMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
