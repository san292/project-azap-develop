// == Import NPM
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
//import axios
import axios from 'axios';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Checkbox,
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
import { regex } from './regex';

/**
 *permet à l'utilisateur de s'enregistrer on ajoutant(nom, email et mot de passe)
 */
const SignUp = () => {
  const history = useHistory();
  const classes = useStyles();
  const [checked, setChecked] = useState();
  const [messageStatus, setMessageStatus] = useState('');
  // Recuperation du message d'erreur
  const [messageWarning, setMessageWarning] = useState();
  const [validedPassword, setValidedPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (regex.test(validedPassword)) {
      const { email, username, password } = e.target.elements;

      // ici on va juste checker si c'est TRUE vu que la valeur par default d'adult
      // dans la BDD est False
      // let adult;
      // if (checked) {
      //   // details.adult = true;
      //   adult = true;
      // }

      let details = {
        email: email.value,
        username: username.value,
        password: password.value
      };

      if (checked) {
        details.adult = true;
      }
      console.log('sanaaa', details);
      // // dans la BDD est False

      try {
        const response = await axios.post(
          // 'https://projet-azap-heroku.herokuapp.com/v1/signup',
          'http://localhost:8000/v1/signup',
          details
        );

        if (response.status === 201)
          setMessageStatus("L'utilisateur a bien été créé ! ");
        history.push('/sign-in/', { message: messageStatus });
      } catch (error) {
        if (error.response.status === 409)
          setMessageWarning('Cet email existe déjà ! ');

        if (error.response.status === 422)
          setMessageWarning("Le format d'email n'est pas valide ! ");

        /* Affichage du message warning durant 7 secondes */
        setTimeout(() => {
          setMessageWarning();
        }, 7000);
      }
    } else {
      setMessageWarning(
        'Le mot de passe doit contenir: Huits caractères minimum, au moins une lettre majuscule, une lettre minuscule et un chiffre'
      );
    }
  };

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleChangePassword = (e) => {
    setValidedPassword(e.target.value);
  };

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs" className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          {/* Affichage d'un message d'erreur à l'utilisateur */}
          {messageWarning ? <Warning message={messageWarning} /> : null}
          <Typography
            component="h3"
            variant="h5"
            className={classes.message}
          ></Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'enregistrer
          </Typography>
          <Typography
            component="span"
            variant="h6"
            className={classes.statusCreated}
          ></Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Pseudo"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChangePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <Checkbox
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'adult' }}
                  label="adult"
                  name="adult"
                  value={checked}
                  id="adult"
                />
                je certifie avoir plus de 18
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              name="adulte"
            >
              Action!
            </Button>
            <Grid container className={classes.sidentifier}>
              <Grid item className={classes.item}>
                <Link to="/sign-in" className={classes.link}>
                  s'identifier
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
 *  fonction qui definit le style css du composant
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
    backgroundColor: '#F3F4EE',
    color: '#414642'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#FED049'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#FED049'
  },
  message: {
    color: '#F50057'
  },
  sidentifier: {
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

export default SignUp;
