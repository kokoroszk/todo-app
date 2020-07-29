import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Store from 'core/store/store';
import { UserState } from 'core/domain/user';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const userSelector = createSelector(
  (state: ReturnType<typeof Store.getState>) => state.user,
  (user: UserState) => user.name
)

export default function Header() {
  const classes = useStyles();

  const userName = useSelector(userSelector);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ color: '#FFF' }} >ToDo App for {userName}</Link>
          </Typography>
          <Link to="/user" style={{ color: '#FFF' }} ><AccountCircle /></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
