import React from "react";
import {
  Button,
  Typography,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  addButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TaskBar(props) {
  const classes = useStyles();

  const { btnAddNoteClick, btnLogoutClick } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.addButton}
            color="inherit"
            onClick={btnAddNoteClick}
          >
            <AddCircle />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Note list
          </Typography>
          <Button color="inherit" onClick={btnLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
