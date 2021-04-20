import { createContext, useReducer } from "react";
import appReducer from "./reducer/appReducer";
import { NOTIFY_TYPE } from "../const/notifyConst";
import { NOTE } from "../const/actionsConst";

const notes = JSON.parse(localStorage.getItem("notes")) || [];

const initialState = {
  //Notify
  isShowNotify: false,
  notifyType: NOTIFY_TYPE.SUCCESS,
  notifyMessage: "",

  //Auth
  isLogged: false,
  isValidUsername: true,
  isValidPassword: true,

  //Note management
  notes: notes,
  isShowDialog: false,
  dialogType: NOTE.CREATE,
  dialogData: null,
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
