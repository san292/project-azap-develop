// == import composant material-ui;
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// == import axios pour la requete;
import axios from 'axios';
//import useEffect de react;
import { useEffect, useState } from 'react';

import DisplaySearch from '../DisplaySearch';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Filters = () => {
  const [movies, setMovies] = useState([]);
  const classes = useStyles();

  const [valueGenre, setValueGenre] = useState('Action');
  const [valueTime, setValueTime] = useState('2h00 et 3h00');
  const [moviesResult, setMoviesResult] = useState([]);

  // je créé un tableau d'objet de durée
  const tabTime = [
    { time: '1h00 et 1h30', minutesgte: 60, minuteslte: 90 },
    { time: '1h30 et 2h00', minutesgte: 90, minuteslte: 120 },
    { time: '2h00 et 3h00', minutesgte: 120, minuteslte: 180 },
    { time: '3h00 et 4h00', minutesgte: 180, minuteslte: 300 },
    { time: '4h00 et 5h00', minutesgte: 240, minuteslte: 300 },
    { time: '5h00 et plus', minutesgte: 300, minuteslte: 600 }
  ];

  const getGenres = async () => {
    try {
      const response = await axios.get(
        // 'https://projet-azap-heroku.herokuapp.com/v1/genres'
        ` https://api.themoviedb.org/3/genre/${valueGenre}/list?api_key=${api_key}&language=en-US`
      );

      const responseGenres = response.data;
      setMovies(responseGenres);
    } catch (error) {
      console.error('error', error.message);
    }
  };

  const handleRadioChangeGenre = (e) => {
    setValueGenre(e.target.value);
  };

  const handleRadioChangeTime = (e) => {
    setValueTime(e.target.value);
  };

  /* Mise à jour de l'email de l'user */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // je récupère l'id du genre sélectionné
    const genre = movies.filter((elem) => elem.name.includes(valueGenre));
    const genreId = genre[0].id;

    // je récupère le temps en minutes du time sélectionné
    const time = tabTime.filter((elem) => elem.time.includes(valueTime));
    const timeMinutesgte = time[0].minutesgte;
    const timeMinuteslte = time[0].minuteslte;
    // je cherche la date du jour et je la transforme au format yyyy-mm-dd
    const dateToday = new Date();
    let dd = dateToday.getDate();
    let mm = dateToday.getMonth() + 1;
    let yy = dateToday.getFullYear();
    // j'ajoute un 0 au cas où j'ai un nombre à un chiffre
    if (mm.toString().length === 1) mm = '0' + mm;
    if (dd.toString().length === 1) dd = '0' + dd;
    // et j'applique le format souhaitez pour la recherche
    const release_date = yy + '-' + mm + '-' + dd;
    const apiKey = '0c0f306539f7e9b203cb170dbc63b634';
    console.log('apikey', apiKey);
    try {
      const response = await fetch(
        // `https://api.themoviedb.org/3/discover/movie?api_key=0c0f306539f7e9b203cb170dbc63b634&language=fr-FR&region=FR&sort_by=release_date.desc&include_adult=false&with_genres=${genreId}&with_runtime.gte=${timeMinutesgte}&with_runtime.lte=${timeMinuteslte}&release_date.lte=${release_date}`
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&region=FR&sort_by=release_date.desc&include_adult=false&with_genres=${genreId}&with_runtime.gte=${timeMinutesgte}&with_runtime.lte=${timeMinuteslte}&release_date.lte=${release_date}`
      );

      const resultat = await response.json();

      setMoviesResult(resultat.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getGenres();
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" className={classes.root}>
          <FormLabel component="h2">Séléctionnez un genre</FormLabel>
          <RadioGroup
            id="120"
            aria-label="genre"
            name="genre"
            value={valueGenre}
            onChange={handleRadioChangeGenre}
            row
          >
            {movies.map((genre) => (
              <FormControlLabel
                key={genre.id}
                value={genre.name}
                control={<Radio />}
                label={genre.name}
                name="genre"
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.root}>
          <FormLabel component="h2">Sélectionnez une durée entre</FormLabel>
          <RadioGroup
            aria-label="time"
            name="time"
            value={valueTime}
            onChange={handleRadioChangeTime}
            row
          >
            {tabTime.map((time) => (
              <FormControlLabel
                key={time.minutes}
                value={time.time}
                control={<Radio />}
                label={time.time}
                name="genre"
              />
            ))}
          </RadioGroup>
          <Button type="submit" variant="contained" className={classes.button}>
            ACTION !
          </Button>
        </FormControl>
      </form>
      <DisplaySearch films={moviesResult} />
    </div>
  );

  /*   return (
    <div className={classes.genreContainer}>
      <div className={classes.genresStyle}>
        {movies.map((genre) => (
            <Chip label={genre.name} key={genre.id} color="#F8D800" clickable className={classes.genre} size='M' />
          ))}
      </div>
    </div>
  ); */
};

const useStyles = makeStyles((theme) => ({
  /* genreContainer: {
    display: "flex",
    justifyContent: "center",
  },
  genresStyle: {
    //background: 'linear-gradient(45deg, #bdc3c7 6.5%, #424642 16%)',
    // backgroundColor: '#424642',
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    color: "#F3F4ED ",
    flexWrap: "wrap",
    width: 600,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  genre: {
    with: 10,
    alignSelf: "center",
    margin: 2,
    color: "#F3F4ED ",
    background: "linear-gradient(80deg, #bdc3c7 7.5%, #424642 16%)",
  }, */
  root: {
    backgroundColor: '#F3F4ED',
    margin: theme.spacing(5),
    padding: theme.spacing(2),
    alignItems: 'center'
  },
  button: {
    width: 200,
    margin: theme.spacing(1, 1, 0, 0),
    backgroundColor: '#F8D800',
    padding: theme.spacing(1, 2)
  }
}));
export default Filters;

// // == Import NPM
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // == import composant material-ui;
// import { makeStyles } from '@material-ui/core/styles';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import Button from '@material-ui/core/Button';

// /** permet de filtrer la recherche par genre  */
// const Filters = ({ setResultat }) => {
//   const [movies, setMovies] = useState([]);
//   const classes = useStyles();

//   const [valueGenre, setValueGenre] = useState('Action');
//   const [valueTime, setValueTime] = useState('2h00 et 3h00');
//   // eslint-disable-next-line no-unused-vars
//   const [moviesResult, setMoviesResult] = useState([]);

//   // je créé un tableau d'objet de durée
//   const tabTime = [
//     { time: '1h00 et 1h30', minutesgte: 60, minuteslte: 90 },
//     { time: '1h30 et 2h00', minutesgte: 90, minuteslte: 120 },
//     { time: '2h00 et 3h00', minutesgte: 120, minuteslte: 180 },
//     { time: '3h00 et 4h00', minutesgte: 180, minuteslte: 300 },
//     { time: '4h00 et 5h00', minutesgte: 240, minuteslte: 300 },
//     { time: '5h00 et plus', minutesgte: 300, minuteslte: 600 }
//   ];

//   const getGenres = async () => {
//     try {
//       const response = await axios.get(
//         // 'https://projet-azap-heroku.herokuapp.com/v1/genres'
//         ` https://api.themoviedb.org/3/genre/${valueGenre}?api_key=0c0f306539f7e9b203cb170dbc63b634&language=en-US`
//       );

//       const responseGenres = response.data;
//       setMovies(responseGenres);
//     } catch (error) {
//       console.error('error', error.message);
//     }
//   };

//   const handleRadioChangeGenre = (e) => {
//     setValueGenre(e.target.value);
//   };

//   const handleRadioChangeTime = (e) => {
//     setValueTime(e.target.value);
//   };

//   /* Mise à jour de l'email de l'user */
//   const handleSubmit = async (e) => {
//     localStorage.removeItem('lastSearchedMovies');
//     e.preventDefault();

//     // je récupère l'id du genre sélectionné
//     const genre = movies.filter((elem) => elem.name.includes(valueGenre));
//     const genreId = genre[0].id;

//     // je récupère le temps en minutes du time sélectionné
//     const time = tabTime.filter((elem) => elem.time.includes(valueTime));
//     const timeMinutesgte = time[0].minutesgte;
//     const timeMinuteslte = time[0].minuteslte;
//     // je cherche la date du jour et je la transforme au format yyyy-mm-dd
//     const dateToday = new Date();
//     let dd = dateToday.getDate();
//     let mm = dateToday.getMonth() + 1;
//     let yy = dateToday.getFullYear();
//     // j'ajoute un 0 au cas où j'ai un nombre à un chiffre
//     if (mm.toString().length === 1) mm = '0' + mm;
//     if (dd.toString().length === 1) dd = '0' + dd;
//     // et j'applique le format souhaitez pour la recherche
//     const release_date = yy + '-' + mm + '-' + dd;

//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/search/withfilters/${genreId}/${timeMinutesgte}/${timeMinuteslte}/${release_date}`
//       );

//       const resultat = await response.json();

//       //on stocke le tableau des movies dans le localStorage afin de garder en mémoire le résulat
//       localStorage.setItem('lastSearchedMovies', JSON.stringify(resultat));

//       setMoviesResult(resultat);
//       setResultat(resultat);

//       // permet de vider la derniere recherche enregistrée au bout de 5 minutes
//       setTimeout(function () {
//         localStorage.removeItem('lastSearchedMovies');
//       }, 5 * 60 * 1000);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     getGenres();
//     return () => setMovies([]);
//   }, []);

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <FormControl component="fieldset" className={classes.genre}>
//           <FormLabel component="h2" className={classes.title}>
//             Séléctionnez un genre
//           </FormLabel>
//           <RadioGroup
//             id="120"
//             aria-label="genre"
//             name="genre"
//             value={valueGenre}
//             onChange={handleRadioChangeGenre}
//             row
//           >
//             {movies.map((genre, index) => (
//               <FormControlLabel
//                 className={classes.radioButton}
//                 key={index}
//                 value={genre.name}
//                 control={<Radio />}
//                 label={genre.name}
//                 name="genre"
//               />
//             ))}
//           </RadioGroup>
//         </FormControl>
//         <FormControl component="fieldset" className={classes.runtime}>
//           <FormLabel component="h2" className={classes.title}>
//             Sélectionnez une durée entre
//           </FormLabel>
//           <RadioGroup
//             aria-label="time"
//             name="time"
//             value={valueTime}
//             onChange={handleRadioChangeTime}
//             row
//           >
//             {tabTime.map((time, index) => (
//               <FormControlLabel
//                 key={index}
//                 value={time.time}
//                 control={<Radio />}
//                 label={time.time}
//                 name="genre"
//               />
//             ))}
//           </RadioGroup>
//           <Button type="submit" variant="contained" className={classes.button}>
//             ACTION !
//           </Button>
//         </FormControl>
//       </form>
//       <DisplaySearch films={moviesResult} />
//     </div>
//   );

//   /*   return (
//     <div className={classes.genreContainer}>
//       <div className={classes.genresStyle}>
//         {movies.map((genre) => (
//             <Chip label={genre.name} key={genre.id} color="#F8D800" clickable className={classes.genre} size='M' />
//           ))}
//       </div>
//     </div>
//   ); */
// };
// const useStyles = makeStyles((theme) => ({
//   genre: {
//     backgroundColor: 'rgb(137, 148, 153)',
//     padding: '2em',
//     margin: '1em'
//   },
//   radioButton: {
//     margin: 'auto',
//     width: '10em',
//     color: '#000'
//   },
//   runtime: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     backgroundColor: 'rgb(137, 148, 153)',
//     padding: '2em',
//     margin: '1em'
//   },
//   title: {
//     margin: 'auto',
//     fontWeight: 600,
//     color: '#000',
//     fontSize: '1.3em',
//     padding: '1em'
//   },
//   button: {
//     width: 200,
//     margin: theme.spacing(1, 1, 0, 0),
//     backgroundColor: '#F8D800',
//     padding: theme.spacing(1, 2),
//     boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
//   }
// }));

// export default Filters;
