import React, { createContext, useReducer } from "react";
import { NOTE } from "../const/actionsConst";
import { NOTIFY_TYPE } from "../const/notifyConst";
import noteReducer from "./reducer/noteReducer";

const notes = JSON.parse(localStorage.getItem("notes")) || [];
const initialState = {
  notes: notes,
  isShowDialog: false,
  dialogType: NOTE.CREATE,
  selectedNote: null,
  isShowNotify: false,
  notifyMessage: "",
  notifyType: NOTIFY_TYPE.SUCCESS
};

const NoteContext = createContext();

const NoteContextProvider = ({ children }) => {
  const [noteState, noteDispatch] = useReducer(noteReducer, initialState);
  const context = {
    noteState,
    noteDispatch,
  };
  return (
    <NoteContext.Provider value={context}>{children}</NoteContext.Provider>
  );
};

export { NoteContext, NoteContextProvider };
