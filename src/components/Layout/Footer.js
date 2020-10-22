import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    align: "center",
    margin: "auto",
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
  copyright: {
    textAlign: "center",
  },
}));

export const Footer = () => {
  const classes = useStyles();

  return (
    <div className={(classes.root, classes.stickToBottom)}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.copyright} position='center'>
            Rating Website
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
