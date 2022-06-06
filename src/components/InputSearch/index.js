/* eslint-disable no-use-before-define */
// == Import NPM
import React from 'react';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';

/**fonction qui permet à l'utilisateur de faire une recherche par titre
 * @param {string} searchText - le film à chercher 
 * @param {string} onSearchChange - l'action des que le texte change 
 * @param {string} onSearchSubmit - soumettre le formulaire 

*/
const InputSearch = ({ searchText, onSearchChange, onSearchSubmit }) => {
  const classes = useStyles();

  return (
    <div className={classes.searchBar}>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          onSearchSubmit();
        }}
      >
        <input
          className={classes.searchInput}
          icon="search"
          placeholder="taper votre recherche"
          value={searchText}
          onChange={(evt) => {
            const textSaisi = evt.target.value;
            onSearchChange(textSaisi);
            console.log('taxteSaisi------------>', textSaisi);
          }}
        />
      </form>
    </div>
  );
};
// == Css styles
const useStyles = makeStyles(() => ({
  searchBar: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#808080'
  },
  searchInput: {
    border: 30,
    padding: 6,
    textAlign: 'left',
    borderRadius: 6,
    color: 'grey',
    fontSize: 14,
    width: 200,
    '&:hover': {
      transform: 'scale3d(1.05, 1.05, 6)',
      width: 300,
      borderRadius: 10,
      color: 'black'
    }
  }
}));
export default InputSearch;
