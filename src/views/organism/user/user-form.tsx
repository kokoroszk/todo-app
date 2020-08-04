import React, {useRef} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { changeName } from 'core/usecase/user';

import NameForm from 'views/molecule/name-input';

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

export default function TaskForm() {
  const classes = useStyles();

  const nameRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef();
  const history = useHistory();

  const dispatch = useDispatch();
  const handleClick = () => {
    changeName(dispatch, nameRef.current?.value || '');
    if(nameRef.current) nameRef.current.value = '';
    history.push("/");
  }

  return (
    <div className={classes.root}>
      <div style={{width:'auto', backgroundColor: 'white'}} >
        <div className={classes.form}>
          <NameForm inputRef={nameRef} />
        </div>
        <div className={classes.form}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleClick}>Submit</Button>
        </div>
      </div>
    </div>
  );
}