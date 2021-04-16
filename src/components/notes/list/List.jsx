import React, { useContext } from "react";
import "./List.css";
import {
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Delete, Edit, Star } from "@material-ui/icons";
import { NoteContext } from "../../context/NoteContext";
import { CONTROL } from "../../const/actionsConst";

export default function List() {
  const { noteState, noteDispatch } = useContext(NoteContext);
  const { notes } = noteState;

  const btnUpdateClick = (note) => () => {
    noteDispatch({ type: CONTROL.SHOW_UPDATE_DIALOG, data: { note } });
  };

  const btnChangeNoteFavoriteStatusClick = (noteId) => () => {
    noteDispatch({
      type: CONTROL.CHANGE_NOTE_FAVORITE_STATUS,
      data: { noteId },
    });
  };

  const btnDeleteClick = (noteId) => () => {
    noteDispatch({ type: CONTROL.SHOW_DELETE_DIALOG, data: { noteId } });
  };

  const displayShortContent = (content) =>
    `${content?.length > 250 ? content.substr(0, 250) : content}...`;
  if (notes && notes.length > 0) {
    const noteSorted = [...notes].sort(
      (notePrevious, note) => note.createTime - notePrevious.createTime
    );
    return noteSorted.map((note) => {
      return (
        <Card key={note.id} className="note-card">
          <CardHeader
            title={note.title}
            subheader={new Date(note.createTime).toDateString()}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {displayShortContent(note.content)}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={btnUpdateClick(note)}>
              <Edit />
            </IconButton>
            <IconButton
              style={{
                color: note.isFavorited
                  ? "rgb(255, 152, 0)"
                  : "rgba(0, 0, 0, 0.54)",
              }}
              onClick={btnChangeNoteFavoriteStatusClick(note.id)}
            >
              <Star />
            </IconButton>
            <IconButton
              className="ml-auto"
              color="secondary"
              onClick={btnDeleteClick(note.id)}
            >
              <Delete />
            </IconButton>
          </CardActions>
        </Card>
      );
    });
  }
  return <div className="text-center m-2">Nothing</div>;
}
