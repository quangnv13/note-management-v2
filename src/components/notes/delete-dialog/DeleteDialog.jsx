import React, { useContext } from "react";
import "./DeleteDialog.css";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { NoteContext } from "../../context/NoteContext";
import { CONTROL, NOTE } from "../../const/actionsConst";

function DeleteDialog(props) {
  const { noteDispatch } = useContext(NoteContext);
  const { isOpen, noteId } = props;
  const onDeleteDialogClose = () => (noteId) => {
    if (noteId) {
      noteDispatch({ type: CONTROL.CLOSE_DIALOG, data: { type: NOTE.DELETE } });
    } else {
      noteDispatch({ type: CONTROL.CLOSE_DIALOG, data: { type: NOTE.DELETE } });
    }
  };
  return (
    <Dialog open={isOpen} onClose={onDeleteDialogClose(null)}>
      <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>This note will be delete permantly!</DialogContent>
      <DialogActions>
        <Button onClick={onDeleteDialogClose(null)} color="primary">
          Cancel
        </Button>
        <Button onClick={onDeleteDialogClose(noteId)} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
