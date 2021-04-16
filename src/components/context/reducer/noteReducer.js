import { CONTROL, NOTE } from "../../const/actionsConst";
import { NOTIFY_MESSAGE, NOTIFY_TYPE } from "../../const/notifyConst";
import { showNotify } from "./notify";
import { makeKey } from "./utils";
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
    data: noteData,
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
    console.log(showNotify(
      { ...state, notes },
      notes[noteIndex].isFavorited ? "Favorited note" : "Favorited note",
      "success"
    ));
    return showNotify(
      { ...state, notes },
      notes[noteIndex].isFavorited ? "Favorited note" : "Favorited note",
      "success"
    );
  }
};

const showDeleteDialog = (state, noteId) => {
  return {
    ...state,
    isShowDialog: true,
    dialogType: NOTE.DELETE,
    data: { noteId },
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
        return createNote({ ...state, isShowDialog: false }, result);
      case NOTE.UPDATE:
        return updateNote({ ...state, isShowDialog: false }, result);
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

const noteReducer = (state, action) => {
  switch (action.type) {
    case CONTROL.SHOW_CREATE_DIALOG:
      return showCreateDialog(state);
    case CONTROL.SHOW_UPDATE_DIALOG:
      return showUpdateDialog(state, action.data.note);
    case CONTROL.SHOW_DELETE_DIALOG:
      return showDeleteDialog(state, action.data.noteId);
    case CONTROL.CLOSE_DIALOG:
      return closeDialog(state, action.data);
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

export default noteReducer;
