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

interface DetailFormProps {
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

export default function MultilineTextFields({value, onChange}: DetailFormProps) {
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
          value={value}
          onChange={onChange}
          variant="outlined"
        />
      </div>
  );
}
