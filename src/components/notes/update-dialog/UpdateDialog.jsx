import React, { useContext, useState } from "react";
import "./UpdateDialog.css";

import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Card,
} from "@material-ui/core";
import { NoteContext } from "../../context/NoteContext";
import { CONTROL } from "../../const/actionsConst";

function UpdateDialog(props) {
  const { noteState, noteDispatch } = useContext(NoteContext);
  const { isOpen } = props;

  const id = noteState.selectedNote?.id;
  const createTime = noteState.selectedNote?.createTime;
  const { noteTitle, setNoteTitle } = useState(
    noteState.selectedNote?.noteTitle
  );
  const { noteContent, setNoteContent } = useState(
    noteState.selectedNote?.noteContent
  );
  const { isValidTitle, setIsValidTitle } = useState(true);
  const { isValidContent, setIsValidContent } = useState(true);

  const onNoteTitleInput = (event) => {
    if (event.target.value) {
      setNoteTitle(event.target.value);
      setIsValidTitle(true);
    } else {
      setIsValidTitle(false);
    }
  };

  const onNoteContentInput = (event) => {
    if (event.target.value) {
      setNoteContent(event.target.value);
      setIsValidContent(true);
    } else {
      setIsValidContent(false);
    }
  };

  const onUpdateDialogClose = () => (data) => {
    if (data) {
      noteDispatch({ type: CONTROL.CLOSE_DIALOG, data });
    } else {
      noteDispatch({ type: CONTROL.CLOSE_DIALOG, data });
    }
  };

  const updateNoteData = {
    id,
    title: noteTitle,
    content: noteContent,
    createTime,
  };

  return (
    <Dialog open={isOpen} onClose={onUpdateDialogClose("cancel")}>
      <DialogTitle id="form-dialog-title">Update note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          variant="outlined"
          fullWidth
          margin="dense"
          id="title"
          label="Title"
          type="text"
          error={isValidTitle}
          value={noteTitle}
          onInput={onNoteTitleInput}
        />
        <TextField
          variant="outlined"
          fullWidth
          margin="dense"
          id="content"
          label="Content"
          type="text"
          error={isValidContent}
          value={noteContent}
          onInput={onNoteContentInput}
          rows={8}
          rowsMax={10}
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Card className="create-time">
          Update time: {new Date().toDateString()}
        </Card>
        <Button onClick={onUpdateDialogClose(null)} color="secondary">
          Cancel
        </Button>
        <Button onClick={onUpdateDialogClose(updateNoteData)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateDialog;
