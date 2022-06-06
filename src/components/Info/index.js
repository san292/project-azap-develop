// == Import NPM
import React from 'react';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

// Recuperation de la props depuis le composant parent
const Info = ({ messageInfo }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="info">{messageInfo}</Alert>
    </div>
  );
};
// == Css styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

export default Info;
