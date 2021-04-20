import { AUTH, CONTROL, NOTE } from "../../const/actionsConst";
import { NOTIFY_MESSAGE, NOTIFY_TYPE } from "../../const/notifyConst";
import { makeKey } from "./utils";

// Notify
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
    isShowNotify: false,
  };
};

// Auth
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

// Note management

const showCreateDialog = (state) => {
  return {
    ...state,
    isShowDialog: true,
    dialogType: NOTE.CREATE,
  };
};

const createNote = (state, newNote) => {
  const notes = [...state.notes, { ...newNote, id: makeKey(15) }];
  localStorage.setItem("notes", JSON.stringify(notes));
  return showNotify({ ...state, notes }, "Added note", "success");
};

const showUpdateDialog = (state, noteData) => {
  return {
    ...state,
    isShowDialog: true,
    dialogData: noteData,
    dialogType: NOTE.UPDATE,
  };
};

const updateNote = (state, noteData) => {
  const { notes } = state;
  const noteIndex = notes.findIndex((note) => note.id === noteData.id);

  if (noteIndex >= 0) {
    notes[noteIndex] = noteData;
    localStorage.setItem("notes", JSON.stringify(notes));
    return showNotify({ ...state, notes }, "Updated note", "success");
  }
};

const changeNoteFavoriteStatus = (state, noteId) => {
  const { notes } = state;
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex >= 0) {
    notes[noteIndex].isFavorited = !notes[noteIndex].isFavorited;
    localStorage.setItem("notes", JSON.stringify(notes));
    return showNotify({ ...state, notes }, "Changed status", "success");
  }
};

const showDeleteDialog = (state, dialogData) => {
  return {
    ...state,
    isShowDialog: true,
    dialogType: NOTE.DELETE,
    dialogData,
  };
};

const deleteNote = (state, noteId) => {
  const { notes } = state;

  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex >= 0) {
    const newNotes = [...notes].filter((note) => note.id !== noteId);
    localStorage.setItem("notes", JSON.stringify(notes));
    return showNotify({ ...state, notes: newNotes }, "Deleted note", "success");
  }
};

const closeDialog = (state, result) => {
  if (result.isConfirmed) {
    switch (result.type) {
      case NOTE.CREATE:
        return createNote({ ...state, isShowDialog: false }, result.data);
      case NOTE.UPDATE:
        return updateNote({ ...state, isShowDialog: false }, result.data);
      case NOTE.DELETE:
        return deleteNote({ ...state, isShowDialog: false }, result.noteId);
      default:
        return showNotify(
          { ...state, isShowDialog: false },
          NOTIFY_MESSAGE.ACTION_INVALID,
          NOTIFY_TYPE.ERROR
        );
    }
  } else {
    return showNotify(
      { ...state, isShowDialog: false },
      "Cancelled",
      "warning"
    );
  }
};

const appReducer = (state, action) => {
  switch (action.type) {
    // Notify
    case CONTROL.HIDE_NOTIFY:
      return hideNotify(state);

    //Auth
    case AUTH.LOGIN:
      return login(state, action.data.username, action.data.password);
    case AUTH.LOGOUT:
      return logout(state);
    case AUTH.ISVALID_USERNAME:
      return setIsvalidUsername(state, action.data.isValid);
    case AUTH.ISVALID_PASSWORD:
      return setIsvalidPassword(state, action.data.isValid);

    //Note management
    case CONTROL.SHOW_CREATE_DIALOG:
      return showCreateDialog(state);
    case CONTROL.SHOW_UPDATE_DIALOG:
      return showUpdateDialog(state, action.dialogData);
    case CONTROL.SHOW_DELETE_DIALOG:
      return showDeleteDialog(state, action.dialogData);
    case CONTROL.CLOSE_DIALOG:
      return closeDialog(state, action.result);
    case CONTROL.CHANGE_NOTE_FAVORITE_STATUS:
      return changeNoteFavoriteStatus(state, action.data.noteId);
    default:
      return showNotify(
        state,
        NOTIFY_MESSAGE.ACTION_INVALID,
        NOTIFY_TYPE.ERROR
      );
  }
};

export default appReducer;
