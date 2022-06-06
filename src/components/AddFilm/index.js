// == Import NPM
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Favorite from '@material-ui/icons/Favorite';
// == Import Components
import Success from '../Success';
import Warning from '../Warning';

/**
 * Component for adding a film to a library'user.
 *
 * @component
 * @example
 * const listes =  axios.get(`https://projet-azap-heroku.herokuapp.com/v1/libraries/${id}/movies`,config);
      setListes(response.data);
      get all the user's lists
 * return (
*     <option value="Veuillez choisir une liste">Veuillez choisir une liste</option>
    {listes.map((liste) => (
      <option key={liste.id} value={liste.id} >
        {liste.name}
      </option>
    ))}
 * )
  * const listeId =   const handleChange = (e) => {setListId(e.target.value);}
      manage id's list from list selected
};
 * return (
    <Select
      onChange={handleChange}
      input={<Input id="demo-dialog-native" />}
    >
      <option value="Veuillez choisir une liste">Veuillez choisir une liste</option>
      {listes.map((liste) => (
        <option key={liste.id} value={liste.id} >
          {liste.name}
        </option>
      ))}
    </Select>    
 * )
    AddFilm.propTypes = {
        id: PropTypes.number
    }
    use in request axios 
    ineherit from component CardFilm
 */

const AddFilm = ({ id }) => {
  const classes = useStyles();

  // permet le suivi de l'état ouvert/fermer de la modal
  const [open, setOpen] = React.useState(false);
  // permet passage de données vers le map dans le html
  const [listes, setListes] = useState([]);
  // permet passage donnée de l'id de liste vers la requete
  const [listeId, setListId] = useState();

  const [successMessage, setSuccessMessage] = useState();
  const [warningMessage, setWarningMessage] = useState();

  useEffect(() => {
    getListes();
    return () => setListes([]);
  }, []);

  // on recupère les listes du user pour afficher dans la modale
  const getListes = async () => {
    const user = localStorage.getItem('user');
    console.log('user addFilm', user);
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token')
        },
        body: {
          user: JSON.parse(localStorage.getItem('user'))
        }
      };
      console.log('confiiiiiiiiiiiiiiiiiiiiiiiiiig', config);
      const response = await axios.get(
        'http://localhost:3000/v1/libraries',
        config
      );
      setListes(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // ajoute un film par son id à une librairie
  const handleSubmit = async () => {
    // fermeture modal
    handleClose();

    // si tout est cohérent on poursuit pour faire la requête
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token')
        },
        method: 'POST'
      };

      const response = await fetch(
        `http://localhost:3000/v1/movie/${id}/add/${listeId}`,
        config
      );

      const status = response.status;
      //console.log("Code du status", status);

      // Message d'information à l'utilisateur si le film est bien ajouté
      if (status === 201) {
        setSuccessMessage('Votre film est bien ajouté !');
        /* Affichage du message success durant 7 secondes */
        setTimeout(() => {
          setSuccessMessage();
        }, 7000);
      }

      //Message d'information à l'utilisateur si le film est déjà dans la liste
      if (status === 409) {
        setWarningMessage('Ce film est déjà dans votre liste !');
        /* Affichage du message warning durant 7 secondes */
        setTimeout(() => {
          setWarningMessage();
        }, 7000);
      }

      //on reinitialise l'état du nom de librairie à nulle
      //setName();
    } catch (e) {
      console.error(e.message);
    }
  };

  // permet récupération de l'id de la liste choisie
  const handleChange = (e) => {
    setListId(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ajout comportement ENTER valide la modal
  const handlePressKey = (e) => {
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
      handleSubmit();
    }
  };

  return (
    <div>
      {/* Affichage du message success */}
      {successMessage ? <Success message={successMessage} /> : null}
      {/* Affichage du message warning */}
      {warningMessage ? <Warning message={warningMessage} /> : null}
      <br />
      <Favorite
        className={classes.iconFav}
        onClick={(e) => {
          e.stopPropagation();
          handleClickOpen();
        }}
      />
      <Dialog open={open} onClose={handleClose} onKeyPress={handlePressKey}>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel
                htmlFor="demo-dialog-native"
                className={classes.inputLabel}
              >
                Mes Listes
              </InputLabel>
              <Select
                native
                // méthode handlechange permet de récupérer la value listeid
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option value="Veuillez choisir une liste">
                  Veuillez choisir une liste
                </option>
                {listes.map((liste) => (
                  <option key={liste.id} value={liste.id}>
                    {liste.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
// == Css styles
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  iconFav: {
    color: '#FF5733',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale3d(1.85, 1.85, 2)'
    }
  },
  inputLabel: {
    fontSize: 20
  }
}));

export default AddFilm;
