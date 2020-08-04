import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DescriptionIcon from '@material-ui/icons/Description';

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

interface DetailInputProps {
  inputRef: React.MutableRefObject<HTMLInputElement | undefined>
};

export default function DetailInput({inputRef}: DetailInputProps) {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <DescriptionIcon />
        <TextField
          id="outlined-multiline-flexible"
          label="input task detail."
          multiline
          rows={3}
          rowsMax={4}
          variant="outlined"
          inputRef={inputRef}
        />
      </div>
  );
}
