// == Import NPM
import React from 'react';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

// Recuperation de la props depuis le composant ModalAddLibrary
const Success = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="success">{message}</Alert>
    </div>
  );
};

// == Css styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

export default Success;
