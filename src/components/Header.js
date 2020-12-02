import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  // const date = new Date().toLocaleString();

  const [time, setTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    async function Time() {
      setTime(new Date().toLocaleDateString());
    }
    Time();
  }, 1000);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <h3> {time} </h3>
   
          <Typography variant="h6" className={classes.title}>
            <h2> Covid 19 Tracker </h2>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
