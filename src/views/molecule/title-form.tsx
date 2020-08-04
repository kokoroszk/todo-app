import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TitleIcon from '@material-ui/icons/Title';

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

type TitleFormProps = {
  inputRef: React.MutableRefObject<HTMLInputElement | undefined>
};

export default function TitleForm({inputRef}: TitleFormProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <TitleIcon />
    <TextField
      id="outlined-multiline-flexible"
      label="input task title."
      variant="outlined"
      inputRef={inputRef}
    />
  </div>
  );
}
