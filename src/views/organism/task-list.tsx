import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Task, { TaskProps } from 'views/molecule/task';
import CircularProgress from '@material-ui/core/CircularProgress';

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
   * show tasks in props.<br>
   * If tasks is undefined, show CircularProgress icon instead.
   * @param tasks: TaskProps | undefined.
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