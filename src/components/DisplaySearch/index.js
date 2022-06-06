// == Imports NPM
import React from 'react';
// == Import library @material-ui
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// -- Import components
import CardFilm from '../CardFilm/CardFilm';

/**resultat is a function for result of search
 * @param {string} films - The props of the search.
 */
const Resultat = ({ films }) => {
  // console.log("verif props 'films'in DisplaySearch component : ", films);
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Display de l'ancienne recherche si toujours en mémoire
  const lastSearch = JSON.parse(localStorage.getItem('lastSearchedMovies'));
  //console.log("🚀 ~ lastSearch", lastSearch)
  // test si ancienne recherche toujours active
  if (lastSearch) films = lastSearch;

  /** map is a function for map of the result of search  */
  return (
    <div className={classes.cards}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        textColor={'primary'}
        TabIndicatorProps={{
          style: {
            display: 'none'
          }
        }}
        aria-label="scrollable force tabs example"
      >
        {films.map((film) => (
          // <Tab icon={<CardFilm key={film.id} {...film} />} />
          <Tab key={film.id} icon={<CardFilm {...film} />} />
        ))}
      </Tabs>
    </div>
  );
};
// == Css styles
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#808080',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    margin: 'auto',
    '&:hover': {
      transform: 'scale3d(1.05, 1.05, 6)',
      backgroundColor: '#808080',
      borderRadius: 10
    }
  },
  media: {
    width: 300,
    height: 400,
    margin: 'auto'
  },
  title: {
    color: '#424642',
    margin: 10
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: '#424642',
    color: '#F3F4ED'
  },
  iconButton: {
    color: 'red'
  }
}));

export default Resultat;
