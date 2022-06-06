// == Import NPM
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
// == Import components
import NavBar from '../NavBar';
import Header from '../Header';
import Footer from '../Footer';
/**
 * represente la fonction qui definit le style css du composant
 */

/**
 * fonction signIn permet à l'utilisateur de sidentifier via son adresse email et son mot de passe
 */
const ResetPassword = () => {
  const classes = useStyles();
  const [status, setStatus] = useState('Action!');
  const [salutation, setSalutation] = useState();
  const [connected, setConnected] = useState('connexion');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('En cours...');
    const { email, password } = e.target.elements;

    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      };
      const response = await fetch(
        // mauvaise route à revoir
        'https://projet-azap-heroku.herokuapp.com/v1/password/reset',
        requestOptions
      );
      console.log('🚀 ~ response', response);
      let data = await response.json();
      console.log('🚀 ~ data', data);
      setStatus('Action!');
      setSalutation(data);
      if (data === "Cet utilisateur n'exite pas !") {
        setConnected('connexion');
      } else {
        setConnected('deconnexion');
      }
    } catch (err) {
      setConnected('Problème de connexion');
      console.log('🚀 ~ err', err);
      console.error(this.props.url, status, err.toString());
    }
  };

  return (
    <>
      <Header stateConnexion={connected} />
      <NavBar />
      <Container component="main" maxWidth="xs" className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Réinitialiser votre mot de passe
            <br />
            {salutation}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              type="email"
              size="3"
              required
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color=""
              className={classes.submit}
            >
              {status}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/sign-up" className={classes.link}>
                  {'Créer un compte'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Footer />
      </Container>
    </>
  );
};

// == Css styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    backgroundColor: '#F3F4EE',
    color: '#424642'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#FED049'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#FED049'
  },

  link: {
    color: 'MediumBlue',
    textDecoration: 'underline',
    '&:hover': {
      color: 'purple',
      textDecoration: 'underline'
    }
  }
}));
export default ResetPassword;
