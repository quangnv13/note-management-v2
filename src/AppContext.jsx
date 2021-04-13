import { createContext, useReducer } from "react";
import { appReducer } from "./appReducer";
import { NOTIFY_TYPE } from "./notifyConst";

const initialState = {
  isLogged: false,
  isShowNotify: false,
  notifyType: NOTIFY_TYPE.SUCCESS,
  notifyMessage: "",
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
