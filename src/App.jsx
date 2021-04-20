import React, { useContext } from "react";
import "./App.css";
import Login from "./components/login/Login";
import Note from "./components/notes/Note";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { CONTROL } from "./components/const/actionsConst";
import {
  AppContext,
} from "./components/context/AppContext";

function App() {
  const { appState, appDispatch } = useContext(AppContext);
  const { isLogged, isShowNotify, notifyMessage, notifyType } = appState;

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const onHideNotify = () => {
    appDispatch({ type: CONTROL.HIDE_NOTIFY });
  };

  const showLoginForm = !isLogged ? <Login></Login> : <Note></Note>;

  return (
    <>
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
    </>
  );
}

export default App;
