import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { addNewTask } from "core/usecase/todo";

import TitleForm from 'views/molecule/title-form';
import DetailForm from 'views/molecule/detail-form';

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

export interface TaskFormProps {
  userName: string
}

export default function TaskForm({userName}: TaskFormProps) {
  const classes = useStyles();

  const titleRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef();
  const detailRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef();

  const dispatch = useDispatch();
  const handleClick = () => {

    const titleVal = titleRef.current?.value || '';
    const detailVal = detailRef.current?.value || '';
    addNewTask(dispatch, titleVal, detailVal, userName);

    if (titleRef.current) titleRef.current.value = '';
    if (detailRef.current) detailRef.current.value = '';
  }

  return (
    <div className={classes.root}>
      <div style={{width:'auto', backgroundColor: 'white'}} >
        <div className={classes.form}>
          <TitleForm inputRef={titleRef} />
        </div>
        <div className={classes.form}>
          <DetailForm inputRef={detailRef} />
        </div>
        <div className={classes.form}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleClick}>Add</Button>
        </div>
      </div>
    </div>
  );
}