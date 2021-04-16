import { AUTH, CONTROL } from "../../const/actionsConst";
import { NOTIFY_MESSAGE, NOTIFY_TYPE } from "../../const/notifyConst";
import { showNotify, hideNotify } from "./notify";

const login = (state, username, password) => {
  if (username === "admin" && password === "admin@123") {
    return showNotify(
      { ...state, isLogged: true },
      NOTIFY_MESSAGE.LOGIN_SUCCESS,
      NOTIFY_TYPE.SUCCESS
    );
  } else {
    return showNotify(
      {
        ...state,
        isLogged: false,
        isValidUsername: false,
        isValidPassword: false,
      },
      NOTIFY_MESSAGE.LOGIN_ERROR,
      NOTIFY_TYPE.ERROR
    );
  }
};

const logout = (state) => {
  return { ...state, isLogged: false };
};

const setIsvalidUsername = (state, isValid) => {
  return {
    ...state,
    isValidUsername: isValid,
  };
};

const setIsvalidPassword = (state, isValid) => {
  return {
    ...state,
    isValidPassword: isValid,
  };
};

const appReducer = (state, action) => {
  switch (action.type) {
    case AUTH.LOGIN:
      return login(state, action.data.username, action.data.password);
    case AUTH.LOGOUT:
      return logout(state);
    case AUTH.ISVALID_USERNAME:
      return setIsvalidUsername(state, action.data.isValid);
    case AUTH.ISVALID_PASSWORD:
      return setIsvalidPassword(state, action.data.isValid);
    case CONTROL.HIDE_NOTIFY:
      return hideNotify(state);
    default:
      return showNotify(
        state,
        NOTIFY_MESSAGE.ACTION_INVALID,
        NOTIFY_TYPE.ERROR
      );
  }
};

export default appReducer;
