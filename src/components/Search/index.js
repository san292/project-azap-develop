// == Import NPM
import React, { useState } from 'react';
import axios from 'axios';
// == Import components
import NavBar from '../NavBar';
import InputSearch from '../InputSearch';
import DisplaySearch from '../DisplaySearch';
import Filters from '../Filters';

/** permet de faire une recherche par nom, realisateur à partir de l'Api */
const Search = () => {
  const apiKey = '0c0f306539f7e9b203cb170dbc63b634';
  const [searchText, setsearchText] = useState('');
  const [resultat, setResultat] = useState([]);

  /** permet de recuperer le texte saisie par l'utilisateur */
  const handleChange = (textSaisi) => {
    setsearchText(textSaisi);
    console.log(
      'verif data from component Search => handleChange :',
      textSaisi
    );
  };
  /** fetch vers l'Api pour recuperer les resultat de la recherche*/
  const fetchResult = async () => {
    try {
      localStorage.removeItem('lastSearchedMovies');

      const response = await axios.get(
        // `https://projet-azap-heroku.herokuapp.com/v1/search/${searchText}`
        // `https://api.themoviedb.org/3/search/${searchText}?api_key=${api_key}&language=en-US&page=1&include_adult=false`

        // `https://api.themoviedb.org/3/search/${searchText}?api_key=0c0f306539f7e9b203cb170dbc63b634`
        ` https://api.themoviedb.org/3/search/${searchText}?api_key=${apiKey}&language=en-US&page=1&include_adult=false`
      );
      const movies = response.data;
      console.log('movie serach 37', movies);

      setResultat(movies);

      localStorage.setItem('lastSearchedMovies', JSON.stringify(movies));

      setTimeout(function () {
        localStorage.removeItem('lastSearchedMovies');
      }, 5 * 60 * 1000);
    } catch (error) {
      console.error('error', error.message);
    }
  };

  const handleSubmit = () => {
    // Je veux lancer une requête
    fetchResult();
  };

  return (
    <div className="Search">
      <NavBar />
      <InputSearch
        searchText={searchText}
        onSearchChange={handleChange}
        onSearchSubmit={handleSubmit}
      />
      <Filters />
      <DisplaySearch films={resultat} />
    </div>
  );
};

export default Search;
