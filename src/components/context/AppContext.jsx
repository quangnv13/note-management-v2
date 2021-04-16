import { createContext, useReducer } from "react";
import appReducer from "./reducer/appReducer";
import { NOTIFY_TYPE } from "../const/notifyConst";

const initialState = {
  isLogged: false,
  isShowNotify: false,
  notifyType: NOTIFY_TYPE.SUCCESS,
  notifyMessage: "",
  isValidUsername: true,
  isValidPassword: true
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(appReducer, initialState);
  const context = {
    appState,
    appDispatch,
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
