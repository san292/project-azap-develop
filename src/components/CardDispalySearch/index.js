// == Import NPM
import React from 'react';
import { Link } from 'react-router-dom';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';
import AddFilm from '../AddFilm';

const CardDisplaySearch = ({
  original_title: title,
  poster_path: poster,
  vote_average: vote,
  id
}) => {
  const classes = useStyles();

  // je destructure les infos de l'user du localstorage
  let username = JSON.parse(localStorage.getItem('user'));

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/movie/${id}`}>
        <CardMedia
          component="img"
          alt="Display films"
          image={`https://image.tmdb.org/t/p/w300/${poster}`}
          title="Display films"
        />
        <CardContent className={classes.title}>
          <Typography variant="subtitle2" component="h2">
            {title}
          </Typography>
          {vote}
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button
          component={Link}
          to={`/movie/${id}`}
          variant="contained"
          size="small"
          className={classes.button}
        >
          Plus d'infos
        </Button>
        {username ? <AddFilm id={id} /> : null}
      </CardActions>
    </Card>
  );
};
// == Css styles
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 310,
    transition: 'transform 0.15s ease-in-out',
    '&:hover': {
      transform: 'scale3d(1.05, 1.05, 1)',
      backgroundColor: '#333'
    },
    paper: {
      width: '90%',
      height: '80%',
      backgroundColor: '#39445a',
      border: '1px solid #282c34',
      borderRadius: 10,
      color: '',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 1, 3)
    }
  },
  button: {
    backgroundColor: '#F8D800',
    margin: 'auto',
    display: 'flex',
    alignItems: 'baseline'
  },
  title: {
    margin: 0,
    padding: 0,
    '&:hover': {
      color: '#F8D800'
    }
  },
  cardActions: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}));
export default CardDisplaySearch;
