// Import de la lib React
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// == Imports Components
import NavBar from '../NavBar';
import ModalAddLibrary from '../ModalAddLibrary';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import MovieIcon from '@material-ui/icons/Movie';
import PeopleIcon from '@material-ui/icons/People';
import ScoreIcon from '@material-ui/icons/Score';

import StarBorder from '@material-ui/icons/StarBorder';
import TheatersIcon from '@material-ui/icons/Theaters';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DateRangeIcon from '@material-ui/icons/DateRange';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemIcon,
  Collapse
} from '@material-ui/core';

const MovieDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [film, setFilm] = useState([]);
  const [listActors, setListActors] = useState([]);
  const [listDirectors, setListDirectors] = useState([]);
  const [genreFilm, setGenreFilm] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [openActors, setOpenActors] = useState(false);
  const [openGenres, setOpenGenres] = useState(false);

  // je destructure les infos de l'user du localstorage
  let username = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickActors = () => {
    setOpenActors(!openActors);
  };

  const handleClickGenres = () => {
    setOpenGenres(!openGenres);
  };

  const getFilm = async () => {
    try {
      const data = await axios.get(`http://localhost:8000/v1/movie/${id}`);

      setFilm(data.data);
      setListActors(data.data.credits.cast);
      setListDirectors(data.data.credits.crew);
      setGenreFilm(data.data.genres);
    } catch (e) {
      console.log('log erreur from component movieDetail => getFilm ', e);
    }
  };

  useEffect(() => {
    getFilm();
    return () => {
      setFilm([]);
      setListActors([]);
      setListDirectors([]);
      setGenreFilm([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // affiche la liste des acteurs avec leurs photos sous forme d'avatar
  const listActorsName = listActors.map((actor, index) => (
    <ListItem button key={index}>
      <ListItemAvatar>
        <Avatar
          alt={actor.name}
          src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
          style={{ height: '50px', width: '50px' }}
        />
      </ListItemAvatar>
      <ListItemText primary={actor.name} secondary={actor.character} />
    </ListItem>
  ));

  const listDirectorsSearch = listDirectors.filter((director) =>
    director.job.includes('Director')
  );

  // affiche la liste des directeurs du film avec les photos le cas échéant
  const listDirectorsName = listDirectorsSearch.map((director, index) => (
    <ListItem button key={index}>
      <ListItemAvatar>
        <Avatar
          alt={director.name}
          src={`https://image.tmdb.org/t/p/w300/${director.profile_path}`}
        />
      </ListItemAvatar>
      <ListItemText primary={director.name} secondary={director.job} />
    </ListItem>
  ));

  // converti la durée exprimée en minutes en heure+minutes
  let minutes = film.runtime % 60;
  const hours = (film.runtime - minutes) / 60;
  minutes = minutes.toLocaleString('fr-FR', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  // converti la date en date française
  let date = film.release_date;
  date = new Date(date).toLocaleDateString('fr-FR');

  // affiche la liste des genres du film
  const listGenres = genreFilm.map((genre, index) => (
    <ListItem button key={index}>
      <ListItemIcon>
        <StarBorder />
      </ListItemIcon>
      <ListItemText primary={genre.name} />
    </ListItem>
  ));

  return (
    <Box component="div" className={classes.mainContainer}>
      <NavBar />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card className={classes.cardContainer}>
            <CardActionArea component="span">
              {film.poster_path && (
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt={film.title}
                  image={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {film.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  align="justify"
                >
                  {film.overview}
                </Typography>

                {username ? <ModalAddLibrary film={film} /> : null}

                <CardActions>
                  <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ScoreIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Note global"
                        secondary={film.vote_average}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ScheduleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Durée"
                        secondary={hours + 'h' + minutes}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <DateRangeIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Sortie le :" secondary={date} />
                    </ListItem>
                    <ListItem button onClick={handleClick}>
                      <ListItemAvatar>
                        <Avatar>
                          <MovieIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Directeurs" />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {listDirectorsName}
                      </List>
                    </Collapse>
                    <ListItem button onClick={handleClickActors}>
                      <ListItemAvatar>
                        <Avatar>
                          <PeopleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Acteurs" />
                      {openActors ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openActors} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {listActorsName}
                      </List>
                    </Collapse>
                    <ListItem button onClick={handleClickGenres}>
                      <ListItemAvatar>
                        <Avatar>
                          <TheatersIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Genres" />
                      {openActors ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openGenres} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {listGenres}
                      </List>
                    </Collapse>
                  </List>
                </CardActions>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
// == Css styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  mainContainer: {
    backgroundColor: '#F3F4ED'
  },
  cardContainer: {
    padding: 30
  },
  media: {
    width: 300,
    height: 400,
    margin: 'auto'
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  iconFav: {
    color: '#FF5733',
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale3d(1.85, 1.85, 2)'
    }
  }
}));

export default MovieDetail;
