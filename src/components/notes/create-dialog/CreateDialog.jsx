import React, { useContext, useState } from "react";
import "./CreateDialog.css";

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

function CreateDialog(props) {
  const { noteDispatch } = useContext(NoteContext);
  const { noteTitle, setNoteTitle } = useState("");
  const { noteContent, setNoteContent } = useState("");
  const { isValidTitle, setIsValidTitle } = useState(true);
  const { isValidContent, setIsValidContent } = useState(true);
  const { isOpen } = props;

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

  const newNote = {
    title: noteTitle,
    content: noteContent,
    createTime: Date.now(),
    isFavorited: false,
  };

  const onCreateDialogClose = () => (data) => {
    if (data) {
      noteDispatch({ type: CONTROL.CLOSE_DIALOG, data});
    } else {
      noteDispatch({ type: CONTROL.CLOSE_DIALOG, data});
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={onCreateDialogClose(null)}>
        <DialogTitle id="form-dialog-title">Create new note</DialogTitle>
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
            onInput={onNoteContentInput}
            rows={8}
            rowsMax={10}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Card className="create-time">
            Create time: {new Date().toDateString()}
          </Card>
          <Button onClick={onCreateDialogClose(null)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={onCreateDialogClose(newNote)}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateDialog;
