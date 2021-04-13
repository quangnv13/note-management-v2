import { AUTH, CONTROL } from "./actionsConst";
import { NOTIFY_MESSAGE, NOTIFY_TYPE } from "./notifyConst";

const login = (state, username, password) => {
  if (username === "admin" && password === "admin@123") {
    return showNotify(
      { ...state, isLogged: true },
      NOTIFY_MESSAGE.LOGIN_SUCCESS,
      NOTIFY_TYPE.SUCCESS
    );
  } else {
    return showNotify(
      { ...state, isLogged: false },
      NOTIFY_MESSAGE.LOGIN_ERROR,
      NOTIFY_TYPE.ERROR
    );
  }
};

const logout = (state) => {
  return { ...state, isLogged: false };
};

const showNotify = (state, message, type) => {
  return {
    ...state,
    isShowNotify: true,
    notifyMessage: message,
    notifyType: type,
  };
};

const hideNotify = (state) => {
    return {
      ...state,
      isShowNotify: false
    };
  };

export const appReducer = (state, action) => {
  switch (action.type) {
    case AUTH.LOGIN:
      return login(state, action.data.username, action.data.password);
    case AUTH.LOGOUT:
      return logout(state);
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
