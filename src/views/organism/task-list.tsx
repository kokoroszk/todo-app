import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Task, { TaskProps } from 'views/molecule/task';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    display: 'flex',
    outline: 0,
    position: 'relative',
    padding: '24px',
    backgroundColor: '#f5f5f5',
    flexWrap: 'wrap'
  }
});

export interface TaskListProps {
  tasks : TaskProps[]
};

export default function TaskList({tasks}: TaskListProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {tasks.map( t => ( <Task {...t} /> ) )}
    </div>
  );
}