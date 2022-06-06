// == Import NPM
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
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
import Warning from '../Warning';
import Info from '../Info';
import { red } from '@material-ui/core/colors';

/**
 * fonction signIn permet à l'utilisateur de sidentifier via son adresse email et son mot de passe
 */
const SignIn = ({ setIsLogged, isLogged }) => {
  console.log('PROCESS;ENV.signin', process.env.PORT);
  const classes = useStyles();
  const [status, setStatus] = useState('Action!');
  // permet affichage du message de bienveue dans la page SignIN
  const [salutation, setSalutation] = useState();
  // permet affichage de l'erreur
  const [errorMessage, setErrorMessage] = useState();
  // permet affichage d'un message d'information
  // eslint-disable-next-line no-unused-vars
  const [infoMessage, setInfoMessage] = useState(
    'Connectez-vous ou créer votre compte'
  );

  // TODO toujours utilisé ?
  // permet affichage du message de connexion du user dans le header
  // const [connected, setConnected] = useState();

  // assignation dun hook react (redirection) à la varible history
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('En cours...');

    // on récupére les donnée du formulaire de login
    const { email, password } = e.target.elements;
    //console.log("e.target.elements",e.target.elements);

    // initialisation des etats à null
    setSalutation();
    setErrorMessage();

    try {
      const data = {
        email: email.value,
        password: password.value
      };
      // console.log("dataaaaaaaaaa", data);

      const response = await axios.post(
        // "https://projet-azap-heroku.herokuapp.com/v1/login",
        'http://localhost:8000/v1/login',
        data
      );
      let result = await response.data;

      if (response.status === 200) {
        // on passe les états
        setSalutation(`Bonjour ${result.user.username}`);

        // TODO toujours utilisé ?
        // setConnected(`Bonjour ${result.user.username}`);

        // on stocke en local les données reçues par API azap token(str) + user(obj)
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        // mise en place de l'état loggé de l'utilisateur : router et permission
        setIsLogged(true);
        // permet la redirection vers home ('/')
        history.push('/');
      }
    } catch (err) {
      if (err.response.status === 401) {
        //  un message pour dire password érroné
        // console.error("🚀 ~ err", err.message);
        // sécurité : force l'état non loggé
        setIsLogged(false);

        // enregistrement du message d'erreur
        setErrorMessage('Mauvais mot de passe ! ');
      } else if (err.response.status === 404) {
        //  message pour dire j'ai pas trouvé le user indiqué
        // console.error("🚀 ~ err", err.message);
        // sécurité : force l'état non loggé
        setIsLogged(false);

        setErrorMessage('Utilisateur Inconnu ! ');
      } else {
        // affiche en console l'erreur + si code 500
        setErrorMessage('Une erreur serveur est survenue ! ');
        console.error('🚀 ~ err', err.message);

        // sécurité : force l'état non loggé
        setIsLogged(false);
      }
      /* Affichage du message warning durant 7 secondes */
      setTimeout(() => {
        setErrorMessage();
      }, 7000);
    }

    // on remet le status du button à son état initial
    //setStatus("Action!");
  };

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs" className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          {/* Affichage d'un message d'erreur à l'utilisateur */}
          {errorMessage ? <Warning message={errorMessage} /> : null}
          {/* Affichage d'un message de non connexion à l'utilisateur */}
          {!isLogged ? <Info messageInfo={infoMessage} /> : null}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'identifier
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
              className={classes.submit}
            >
              {status}
            </Button>
            <Grid container className={classes.creerCompte}>
              <Grid item xs>
                {/* Lien vers mot de passe oublié sprint X
                  <Link href="#" variant="body2">
                    Mot de passe oublié?
                  </Link> 
                */}
              </Grid>
              <Grid item>
                <Link to="/sign-up" className={classes.link}>
                  {'Créer un compte'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};
/**
 * represente la fonction qui definit le style css du composant
 */
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
  error: {
    color: red
  },

  creerCompte: {
    display: 'flex',
    justifyContent: 'center'
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

export default SignIn;
