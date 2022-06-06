// == Import NPM
import React, { useState } from 'react';
import axios from 'axios';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// == Import Components
import Warning from '../Warning';

/**
 * Component for creating a list.
 *
 * @component
 * @example
 * const name =  const handleChange = (e) => {setName(e.target.value)};
 * manage name submit by user

 * return (
*      <DialogContent>
            <form className={classes.text}>
            <TextField 
            id="createListe"
            label="Nouvelle liste"
            value={name}
            onChange={handleChange}
            />
            </form>
        </DialogContent>
 * )

ModalCreateList.propTypes = {

    getFilmsListed: PropTypes.func
    
    using at the end of axios request
    allow update from userLibrary
 */

const ModalCreateList = ({ getFilmsListed }) => {
  const classes = useStyles();
  // permet le suivi de l'état ouvert/fermer de la modal
  const [open, setOpen] = React.useState(false);
  // permet passage de donnée le nom de la liste à créer
  const [name, setName] = useState();
  // le state name stock le nom de la liste créée par le user
  const [warningMessage, setWarningMessage] = useState();

  // enregistre la nouvelle library et la retourne
  const handleSubmit = async () => {
    // si user un nom de library vide on l'alerte
    if (!name) {
      setWarningMessage('Veuillez choisir un nom valide ');
      /* Affichage du message warning durant 7 secondes */
      setTimeout(() => {
        setWarningMessage();
      }, 7000);
    }

    // fermeture modal
    handleClose();

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      };
      const user = localStorage.getItem('user');
      console.log('user-----> modalcreate', user);

      const { id } = JSON.parse(user);

      console.log('userId creatList', id);
      console.log('user 76 modaleCreate ', id);
      //  {name: 'yann', user: '{"id":63,"email":"yan1@hotmail.com","username":"yan1","adult":true,"role":null}'}
      const data = {
        name: name,
        user_id: id
      };

      console.log('nom de la bibliotheque crée modalcreate react', data);

      // le name est envoyé à l'api dans la variable data

      await axios.post('http://localhost:8000/v1/libraries/add', data, config);

      console.log('data------------->', data, config);

      //Je déclenche la fonction getFilmsListed pour update dans userLibrary
      getFilmsListed();
    } catch (e) {
      console.log(e.message);
    }
  };

  // permet de transmettre le nom de la nouvelle library à créer
  const handleChange = (e) => {
    setName(e.target.value);
  };

  // permet l'ouverture de la modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // permet la fermeture de la modal
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
      {/* Affichage du message warning */}
      {warningMessage ? <Warning message={warningMessage} /> : null}
      <br />
      <IconButton onClick={handleClickOpen}>
        <Avatar className={classes.avatar}>
          <AddCircleIcon onClick={handleClickOpen} className={classes.icon} />
        </Avatar>
      </IconButton>
      <Dialog open={open} onClose={handleClose} onKeyPress={handlePressKey}>
        <DialogContent>
          <form className={classes.text}>
            <TextField
              id="createListe"
              label="Nouvelle liste"
              value={name}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button type="submit" onClick={handleSubmit} color="primary">
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
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  icon: {
    color: '#F8D800',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale3d(1.85, 1.85, 2)'
    }
  },
  avatar: {
    margin: 'auto'
  }
}));

export default ModalCreateList;
