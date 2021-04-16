import React, { useContext } from "react";
import "./Note.css";
import { CssBaseline, Container, Card } from "@material-ui/core";
import TaskBar from "./task-bar/TaskBar";
import List from "./list/List";
import CreateDialog from "./create-dialog/CreateDialog";
import UpdateDialog from "./update-dialog/UpdateDialog";
// import DeleteDialog from "./delete-dialog/DeleteDialog";
import { AUTH, CONTROL, NOTE } from "../const/actionsConst";
import { NoteContext } from "../context/NoteContext";
import { AppContext } from "../context/AppContext";

function Note() {
  const { appDispatch } = useContext(AppContext);
  const { noteState, noteDispatch } = useContext(NoteContext);
  const { isShowDialog, dialogType, selectedNote } = noteState;

  const btnLogoutClick = () => {
    appDispatch({ type: AUTH.LOGOUT });
  };

  const btnCreateNoteClick = () => {
    noteDispatch({ type: CONTROL.SHOW_CREATE_DIALOG });
  };



  return (
    <Container maxWidth="md">
      <CssBaseline>
        <TaskBar
          btnCreateNoteClick={btnCreateNoteClick}
          btnLogoutClick={btnLogoutClick}
        ></TaskBar>
        <Card className="note-container">
          <List></List>
        </Card>
      </CssBaseline>

      <CreateDialog
        isOpen={isShowDialog && dialogType === NOTE.CREATE}
      ></CreateDialog>

      <UpdateDialog
        key={selectedNote?.id}
        isOpen={isShowDialog && dialogType === NOTE.UPDATE}
      ></UpdateDialog>

      {/* <DeleteDialog
          key={deleteNoteId + "del"}
          isOpen={isShowDialog && dialogType === "delete"}
          deleteNoteId={deleteNoteId}
          onDeleteDialogClose={this.onDeleteDialogClose}
        ></DeleteDialog> */}
    </Container>
  );
}

export default Note;
