import React from 'react';
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { deleteTask } from 'core/usecase/todo'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export interface TaskProps {
    /**
     * id.
     */
    id: number,

    /**
     * title of task.
     */
    title: string,

    /**
     * detail of task.
     */
    detail: string,

    /**
     * assignee of taks.
     */
    assignee: string
};

export default function Taks({id, title, detail, assignee}: TaskProps) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const handleDeleteButton = () =>{
    deleteTask(dispatch, id);
  }

  return (
    <div style={{width:'100%', display: 'flex', justifyContent: 'center', margin: '10px'}} >
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          task id: {id}
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <AccountCircle /> {assignee}
        </Typography>
        <Typography variant="body2" component="p" style={{whiteSpace: 'pre-line'}}>
          {detail}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDeleteButton} >Delete</Button>
      </CardActions>
    </Card>
    </div>
  );
}
