import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import TitleForm from 'views/molecule/title-form';
import DetailForm from 'views/molecule/detail-form';

import Store from 'core/store/store';
import { UserState } from 'core/domain/user';
import { addNewTask } from "core/usecase/todo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
      display: 'flex',
      outline: 0,
      position: 'relative',
      padding: '24px',
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
     flexWrap: 'wrap'
    },
    form: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: '2px'
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

const userSelector = createSelector(
  (state: ReturnType<typeof Store.getState>) => state.user,
  (user: UserState) => user.name
)

export default function TaskForm() {
  const classes = useStyles();

  const name = useSelector(userSelector);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const dispatch = useDispatch();
  const handleClick = () => {
    addNewTask(dispatch, title, detail, name);
    setTitle('');
    setDetail('');
  }

  return (
    <div className={classes.root}>
      <div style={{width:'auto', backgroundColor: 'white'}} >
        <div className={classes.form}>
          <TitleForm value={title} onChange={(e) => {setTitle(e.target.value)}} />
        </div>
        <div className={classes.form}>
          <DetailForm value={detail} onChange={(e) => {setDetail(e.target.value)}} />
        </div>
        <div className={classes.form}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleClick}>Add</Button>
        </div>
      </div>
    </div>
  );
}