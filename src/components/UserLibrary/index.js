// == Import NPM
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import ModalCreateList from '../ModalCreateList';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// == Import components
import ModalEditList from '../ModalEditList';
import NavBar from '../NavBar';

/**
 * Component for showing user Libraries.
 *
 * @component
 * @example
 * const listes =  axios.get(`https://projet-azap-heroku.herokuapp.com/v1/libraries/${id}/movies`,config);
      setListes(response.data);
      get all the lists from user

 * return (
  *    {listes.map((liste) => (
          <Accordion key={liste.id} className={classes.container}>
            <AccordionSummary id="panel1bh-header">
              <Typography variant="h6" className={classes.title}>
                {liste.name}
              </Typography>

      {liste.moviesDetails.map((filmListed) => (
                    <ListItem key={filmListed.id}>
 * )
 */

const UserLibrary = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars

  // state 'expanded' ouvre et ferme l'accordion des listes
  // state 'listes' stock les données de getFilmsListed : la requetes initial celle sur laquelle on recupére les listes et les films
  // eslint-disable-next-line no-unused-vars
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [listes, setListes] = useState([]);

  // natif de materialUI: permet d'ourvir / fermer les listes
  const handleChange = (panel) => (event, isExpanded) => {
    setIsExpanded(isExpanded ? panel : false);
  };

  // au chargement et à la création d'une nouvelle liste : déclenche la méthode pour récupérer les librairies et les films de l'utilisateur connecté
  useEffect(() => {
    getFilmsListed();
    return () => setListes([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // je destructure les infos de l'user du localstorage
  let { id, username } = JSON.parse(localStorage.getItem('user'));
  let movies = localStorage.getItem('movies');
  console.log('movies userLibrary 69', movies);
  // console.log('id userlibrary 68', id);
  const token = localStorage.getItem('token');
  console.log('token userlibrary 70', token);
  // permet recuperation des listes et des films
  const getFilmsListed = async () => {
    console.log('🚀 getFilmsListed userlibrary 73');
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      };

      const response = await axios.get(
        `http://localhost:8000/v1/libraries/${id}/movies`,

        config
      );
      setListes(response.data);
      console.log(
        ' des response.data dans getfilmlisted userlibrary=>',
        response.data
      );
    } catch (e) {
      console.error(e.response.data);
    }
  };

  const handleDeleteList = async (listId) => {
    // console.log('🚀 ~ listId  userlibrary 95', listId);
    //console.log("déclenche methode handledeleteList");

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      };
      // format de request axios Post
      // const response = await axios.delete(url, config(obj)[optional]);
      await axios.delete(
        `http://localhost:8000v1/libraries/${listId}/delete`,
        config
      );
      // assignation de valeur au state donc je declenche le hook: getFilmListed
      getFilmsListed();

      //console.log(response)
    } catch (e) {
      //console.log(e.message);
    }
  };

  const handleDeleteFilm = async (filmId) => {
    //console.log("🚀 ~ filmId => handleDeleteFilm", filmId);
    //console.log("déclenche methode handleDeleteFilm");

    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      };
      // format de request axios Post
      // const response = await axios.delete(url, config(obj)[optional]);
      await axios.delete(
        `http://localhost:8000v1/libraries/movie/${filmId}/delete`,
        config
      );
    } catch (e) {
      //console.log(e.message);
    }
    // re intialise le state donc je declenche le hook: getFilmListed
    getFilmsListed();
  };

  return (
    <div className="user-library">
      <NavBar />
      <div className="create_button">
        <Typography component="h1" variant="h5" className={classes.typo}>
          Hello {username}
        </Typography>
        <ModalCreateList getFilmsListed={getFilmsListed} />
      </div>
      <div className={classes.root}>
        {listes.map((liste) => (
          <Accordion key={liste.id} className={classes.container}>
            <AccordionSummary id="panel1bh-header">
              <Typography variant="h6" className={classes.title}>
                {liste.name}
              </Typography>

              <ModalEditList liste={liste} getFilmsListed={getFilmsListed} />
              <DeleteIcon
                className={classes.iconList}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteList(liste.id);
                }}
              />
              <ExpandMoreIcon
                onChange={(e) => {
                  handleChange('panel1');
                }}
                onClick={(e) => {
                  getFilmsListed();
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <List>
                  {liste.moviesDetails.map((filmListed) => (
                    <ListItem key={filmListed.id}>
                      <div className={classes.moviesliste}>
                        <CardContent
                          className={classes.cardContent}
                          component={Link}
                          to={`/movie/${filmListed.id}`}
                        >
                          <CardMedia
                            className={classes.poster}
                            component="img"
                            alt="poster"
                            image={`https://image.tmdb.org/t/p/original/${filmListed.poster_path}`}
                            title="poster film"
                          />
                          <Typography className={classes.movieTitle} />
                          {filmListed.title}
                          <Typography />
                        </CardContent>
                        <DeleteIcon
                          className={classes.iconDeleteFilm}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFilm(filmListed.id);
                          }}
                        />
                      </div>
                    </ListItem>
                  ))}
                </List>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

// == Css styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    margin: 'auto',
    paddingTop: 20
  },
  container: {
    backgroundColor: '#F3F4ED',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    flexShrink: 2,
    backgroundColor: '#F3F4ED',
    margin: 'auto'
  },
  iconList: {
    display: 'flex',
    justifyContent: 'space-between',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale3d(1.85, 1.85, 2)'
    }
  },
  title: {
    margin: 'auto',
    fontWeight: 600
  },
  poster: {
    width: '70px'
  },
  moviesliste: {
    width: '100%',
    display: 'flex'
  },
  cardContent: {
    textDecoration: 'none',
    color: '#000',
    fontSize: '1.3em'
  },
  movieTitle: {
    padding: 10
  },
  iconDeleteFilm: {
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale3d(1.85, 1.85, 2)'
    },
    padding: '1em'
  },
  typo: {
    margin: theme.spacing(3, 1),
    fontWeight: 600
  },
  dropdown: {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  }
}));

export default UserLibrary;
