import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Task, { TaskProps } from 'views/molecule/task';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    display: 'flex',
    outline: 0,
    position: 'relative',
    padding: '24px',
    backgroundColor: '#f5f5f5',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});

export interface TaskListProps {

  /**
   * TaskProps[] | undefined<br>
   * when undefined, show CircularProgress icon.
   */
  tasks : TaskProps[] | undefined
};

export default function TaskList({tasks}: TaskListProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      { tasks === undefined ? <CircularProgress /> : tasks.map(t => (<Task {...t} /> )) }
    </div>
  );
}