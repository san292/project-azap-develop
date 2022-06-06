// == Imports NPM
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// == Imports Components
import NavBar from '../NavBar';
//import Header from "../Header";
//import Footer from "../Footer";
import Warning from '../Warning';
import Success from '../Success';

import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  CssBaseline
} from '@material-ui/core';
import MovieIcon from '@material-ui/icons/Movie';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const User = ({ setIsLogged }) => {
  const classes = useStyles();

  // je destructure les infos de l'user du localstorage
  let { id, email, username, adult, role } = JSON.parse(
    localStorage.getItem('user')
  );

  const history = useHistory();

  // je récupère le token de l'User
  const token = localStorage.getItem('token');
  // je prépare un useState pour les messages update bdd ok ou pas ok
  const [messageSuccess, setMessageSuccess] = useState();
  // je stocke le message d'erreur
  const [messageError, setMessageError] = useState();

  /* Mise à jour de l'email de l'user */
  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    const { newemail } = e.target.elements;

    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: newemail.value
        })
      };
      const response = await fetch(
        'http://localhost:8000/v1/account/email/reset',

        requestOptions
      );

      await response.json();

      if (response.status === 200) {
        // je met à jour la nouvelle adresse mail dans le local storage
        email = newemail.value;

        // création d'un objet
        const newUser = {
          id: id,
          email: email,
          username: username,
          adult: adult,
          role: role
        };

        // je supprimer l'user du localStorage
        localStorage.removeItem('user');
        // et j'ajoute le nouvel user dans le localStorage
        localStorage.setItem('user', JSON.stringify(newUser));

        // j'affiche un message pour dire que c'est ok
        setMessageSuccess('Le mail a bien été modifié !');
        /* Affichage du message warning durant 7 secondes */
        setTimeout(() => {
          setMessageSuccess();
        }, 7000);
      }
    } catch (err) {
      setMessageError('Il y a eu un problème, veuillez recommencer.');
      /* Affichage du message warning durant 7 secondes */
      setTimeout(() => {
        setMessageError();
      }, 7000);
      console.error(this.props.url, err.toString());
    }
  };

  /* Mise à jour de l'username de l'user */
  const handleSubmitUsername = async (e) => {
    e.preventDefault();

    const { newusername } = e.target.elements;

    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: newusername.value
        })
      };
      const response = await fetch(
        'http://localhost:8000/v1/account/username/reset',
        requestOptions
      );

      await response.json();

      if (response.status === 200) {
        // je met à jour la nouvelle adresse mail dans le local storage
        username = newusername.value;

        // création d'un objet
        const newUser = {
          id: id,
          email: email,
          username: username,
          adult: adult,
          role: role
        };

        // je supprimer l'user du localStorage
        localStorage.removeItem('user');
        // et j'ajoute le nouvel user dans le localStorage
        localStorage.setItem('user', JSON.stringify(newUser));

        // j'affiche un message pour dire que c'est ok
        setMessageSuccess('Le pseudo a bien été modifié !');
      }
    } catch (err) {
      setMessageError('Il y a eu un problème, veuillez recommencer.');
      /* Affichage du message warning durant 7 secondes */
      setTimeout(() => {
        setMessageError();
      }, 7000);
      console.error(this.props.url, err.toString());
    }
  };

  /* Mise à jour de l'username de l'user */
  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    const { newpassword } = e.target.elements;

    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: newpassword.value
        })
      };
      const response = await fetch(
        'http://localhost:8000/v1/password/reset',
        requestOptions
      );

      await response.json();

      if (response.status === 200) {
        // j'affiche un message pour dire que c'est ok
        setMessageSuccess('Le mot de passe a bien été modifié !');
      }
    } catch (err) {
      setMessageError('Il y a eu un problème, veuillez recommencer.');
      /* Affichage du message warning durant 7 secondes */
      setTimeout(() => {
        setMessageError();
      }, 7000);
      console.error(this.props.url, err.toString());
    }
  };

  /* Suppression définitif du compte user */
  const handleSubmitDelete = async (e) => {
    e.preventDefault();

    try {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      };
      const response = await fetch(
        'http://localhost:8000/v1/account/delete',
        requestOptions
      );

      await response.json();

      if (response.status === 200) {
        // suppression de l'user et du token dans le localStorage
        localStorage.clear();
        setIsLogged(false);
        // redirection page accueil
        history.push('/');
      }
    } catch (err) {
      setMessageError('Il y a eu un problème, veuillez recommencer.');
      /* Affichage du message warning durant 7 secondes */
      setTimeout(() => {
        setMessageError();
      }, 7000);
      console.error(this.props.url, err.toString());
    }
  };

  return (
    <div>
      <NavBar />
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Grid container className={classes.centerGrid}>
          <CssBaseline />
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.typo}>
              Hello {username}
            </Typography>
          </Grid>
        </Grid>
        {messageSuccess ? <Success message={messageSuccess} /> : null}
        {messageError ? <Warning message={messageError} /> : null}
        <Grid container>
          <CssBaseline />
          <Typography component="h1" variant="h5" className={classes.typo}>
            Vous pouvez modifier vos informations ici :
            {/* <div className={classes.typored}>{messageEmail}</div> */}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmitEmail}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                {/* mettre error juste avant textfield  et helperText="Format de l'email incorrect"*/}
                <TextField
                  defaultValue={email}
                  variant="filled"
                  required
                  fullWidth
                  id="newemail"
                  label="Votre adresse email"
                  name="newemail"
                  autoComplete="email"
                  type="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label="updateemail" type="submit">
                  <MovieIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
          <form className={classes.form} onSubmit={handleSubmitUsername}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  defaultValue={username}
                  variant="filled"
                  required
                  fullWidth
                  id="newusername"
                  label="Votre pseudo"
                  name="newusername"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label="updateusername" type="submit">
                  <MovieIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
          <form className={classes.form} onSubmit={handleSubmitPassword}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="newpassword"
                  label="Entrez un nouveau mot de passe"
                  type="password"
                  id="newpassword"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton aria-label="updatepassword" type="submit">
                  <MovieIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid container className={classes.centerGrid}>
          <CssBaseline />

          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h5"
              className={classes.typoheight}
            >
              Suppression définitive du compte
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form className={classes.formtrash} onSubmit={handleSubmitDelete}>
              <IconButton aria-label="deleteaccount" type="submit">
                <DeleteForeverIcon
                  fontSize="large"
                  className={classes.trashred}
                />
              </IconButton>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    /* display: "flex",
        width: "60%",
        "& > *": {
            margin: theme.spacing(1),
            flexGrow: 1,
        }, */
    padding: theme.spacing(1)
  },
  centerGrid: {
    backgroundColor: '#F8D802',
    marginTop: theme.spacing(3)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formtrash: {
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  typo: {
    margin: theme.spacing(3, 1),
    fontWeight: 600
  },
  typoheight: {
    margin: theme.spacing(1),
    fontWeight: 700,
    color: 'gray'
  },
  typored: {
    fontWeight: 600,
    color: '#ff0000'
  },
  trashred: {
    fontWeight: 600,
    color: '#8f0808'
  }
}));

export default User;
