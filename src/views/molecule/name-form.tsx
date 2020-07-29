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
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

export default function TitleForm({value, onChange}: TitleFormProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AccountCircle />
    <TextField
      id="outlined-multiline-flexible"
      label="input new name."
      value={value}
      onChange={onChange}
      variant="outlined"
    />
  </div>
  );
}
