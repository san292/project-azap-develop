// == Import NPM
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Button, Container } from '@material-ui/core';
// == Import components
import CardFilm from '../CardFilm/CardFilm';

const a11yProps = (index) => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  };
};

/**
 * Component for displays CardFilm.
 *
 * @component
 * @example
 * const Trending =  await axios.get("https://projet-azap-heroku.herokuapp.com/v1/topmovies");
                      setTrending(data.data);
 * get films trending

 * return (
*      {trending.map((film) => (
        <Tab
          key={film.id}
          icon={<CardFilm {...film} /> }
          {...a11yProps(0)}
        />
        ))}
 * )
    
  const userName = if (localStorage.getItem("user")) {let { username } = JSON.parse(localStorage.getItem("user"));
    setUsername(username);}
  test if user is connected :condionnal display on button to signIn component

  return (
    {username ? (
      <Typography
      component="h1"
      variant="h5"
      className={classes.username}
  >
      Hello {username}
  </Typography>
    ) : (
      <div className={classes.root}>
        <Button
          variant="contained"
          href="/sign-up"
          className={classes.button}>
          ACTION !
        </Button>
      </div>
    )}
  )

 */

const Display = () => {
  const classes = useStyles();

  const [trending, setTrending] = useState([]);
  /*   const [upcoming, setUpcoming] = useState([]) */

  const [username, setUsername] = useState('');
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getUserName = () => {
    // je destructure les infos de l'user du localstorage
    if (localStorage.getItem('user')) {
      let { username } = JSON.parse(localStorage.getItem('user'));
      setUsername(username);
    }
  };

  const getTrending = async () => {
    const apiKey = '0c0f306539f7e9b203cb170dbc63b634';
    try {
      const data = await axios.get(
        // "https://projet-azap-heroku.herokuapp.com/v1/topmovies"
        ` https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
      );
      console.log(
        'verif data from component display getTrending :',
        data.data.results
      );
      setTrending(data.data.results);
    } catch (e) {
      //console.log("log erreur component display on getTrending :", e);
    }
  };

  // TODO 04/08 ajout du cleanup
  useEffect(() => {
    getTrending();
    getUserName();

    return () => {
      setUsername('');
      setTrending([]);
    };
  }, []);

  return (
    <>
      {/* <Typography variant="body1" className={classes.texte}>
        Bienvenue chez AZAP ! En créant un compte, vous pourrez ajouter des
        listes dans votre filmothèque dans lesquelles vous pourrez y mettre des
        films. Vous pouvez par exemple créer des films "À regarder plus tard",
        "À acheter plus tard", "Blockbusters", "Samedi soir", ... Recherchez un
        film et cliquez sur le petit coeur pour l'ajouter à une de vos listes.
      </Typography> */}
      {username ? (
        <Typography component="h1" variant="h5" className={classes.username}>
          Hello {username}
        </Typography>
      ) : (
        <div className={classes.root}>
          <Button
            variant="contained"
            component={Link}
            to="/sign-up"
            className={classes.button}
          >
            ACTION !
          </Button>
        </div>
      )}
      <Typography variant="h2" className={classes.title}>
        Films les mieux notés
      </Typography>

      <container className={classes.cards}>
        <Tabs
          className="tabs"
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
          {trending.map((film) => (
            <Tab
              key={film.id}
              icon={<CardFilm {...film} />}
              {...a11yProps(0)}
            />
          ))}
        </Tabs>
      </container>
    </>
  );
};
// == Css styles
const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: 50,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      color: '#F8D800'
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 34,
      color: '#F3F4ED'
    },

    padding: 20,
    color: '#F3F4ED'
  },
  texte: {
    width: '80%',
    display: 'flex',
    margin: 'auto',
    fontSize: 16,
    padding: 20,
    textAlign: 'justify'
  },
  username: {
    textAlign: 'center',
    margin: theme.spacing(3, 1),
    fontWeight: 600,
    color: '#F3F4ED',
    fontSize: 30,
    [theme.breakpoints.down('lg')]: {
      fontSize: 28
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 19
    }
  },
  cards: {
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    backgroundImage: '#F3F4ED '
    // [theme.breakpoints.down('md')]: {
    //   width: "92%",
    // },
    // [theme.breakpoints.down('lg')]: {
    //   width: "80",
    // },
  },
  button: {
    backgroundColor: '#F8D800',
    padding: theme.spacing(1, 2),
    fontWeight: 600,
    fontSize: 15,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
  }
}));

export default Display;
