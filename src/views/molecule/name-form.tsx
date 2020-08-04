import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

interface TitleFormProps {
  inputRef: React.MutableRefObject<HTMLInputElement | undefined>
};

export default function TitleForm({inputRef}: TitleFormProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AccountCircle />
    <TextField
      id="outlined-multiline-flexible"
      label="input new name."
      inputRef={inputRef}
      variant="outlined"
    />
  </div>
  );
}
