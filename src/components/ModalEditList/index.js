// == Import NPM
import React, { useState } from 'react';
import axios from 'axios';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * Component for editing name's list.
 *
 * @component
 * @example
 * const name =  const handleChange = (e) => {setName(e.target.value)};
 * manage name submit by user

 * return (
*     <DialogTitle >Editer une liste  </DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Saisissez un nouveau nom "
                type="text"
                value={name}
                onChange={handleChange}
            />
    </DialogContent>
 * )

ModalEditList.propTypes = {
    liste: PropTypes.shape({
        id: PropTypes.number
    })
* 
use in select to handle ListeId 
inherit from UserLibrary

    getFilmsListed: PropTypes.func
    
    using at the end of axios request
    allow update from userLibrary
 */

const ModalEditList = ({ liste, getFilmsListed }) => {
  // state 'name' stock le name d'une liste pour la méthode handleEditList
  // state 'open' stock le true false qui declenche le render de la modale handleEditList
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState();

  // ouvrir et fermer la modal pour editer une liste
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEditList = async (listeId) => {
    // on teste si le nom de la bibliotheque est vide
    // si vide alors alert
    if (!name) return alert('Veuillez entrer un nom cohérent !');

    // fermeture modal
    handleClose();

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      };
      //const user = JSON.parse(localStorage.getItem("user"));
      // const response = await axios.post(url, data(obj) , config(obj));
      const data = {
        name: name
      };
      await axios.put(
        `http://localhost:8000/v1/libraries/${listeId}/edit`,
        data,
        config
      );

      // Je declenche le hook: getFilmListed pour update dans Userlibrary
      getFilmsListed();

      // const newName = response.data;
      //console.log("log du nouveau name de liste : ", name)
    } catch (e) {
      //console.log("log erreur depuis UserLibrary => handleEdit : ", e)
    }
  };

  // methode pour stocker la value=name pour éditer la liste
  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <EditIcon
        className={classes.iconList}
        onClick={(e) => {
          e.stopPropagation();
          handleClickOpen();
        }}
      />
      {/* onclick sur le bouton edit ouvre la modale editer le nom d'une liste :  */}
      <Dialog
        key={liste.id}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Editer une liste </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Saisissez un nouveau nom "
            type="text"
            value={name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button
            type="submit"
            onClick={(e) => {
              e.stopPropagation();
              handleEditList(liste.id);
            }}
            color="primary"
          >
            Editer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
// == Css styles
const useStyles = makeStyles(() => ({
  iconList: {
    display: 'flex',
    justifyContent: 'space-between',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale3d(1.85, 1.85, 2)'
    }
  }
}));

export default ModalEditList;
