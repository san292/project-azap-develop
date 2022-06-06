// == Import NPM
import React from 'react';
import { Link } from 'react-router-dom';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
// == Import image
import Logo from '../Header/logo_azap.png';

/** function Header export Header component  */
const Header = ({ isLogged, setIsLogged }) => {
  const classes = useStyles();

  const logOut = () => {
    localStorage.clear();
    setIsLogged(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.headerContainer}>
          <Button component={Link} to="/">
            <img src={Logo} alt="Logo" className={classes.logo} />
          </Button>

          {!isLogged && (
            <Button
              variant="contained"
              component={Link}
              to="/sign-in"
              className={classes.button}
            >
              connexion
            </Button>
          )}

          {isLogged && (
            <Button
              variant="contained"
              component={Link}
              to="/"
              className={classes.button}
              onClick={logOut}
            >
              deconnexion
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
/** variable useStyles store function makeStyles
 * function makeStyles () store component's classes uses for styling
 */
const useStyles = makeStyles(() => ({
  headerContainer: {
    background: 'linear-gradient(45deg, #bdc3c7 6.5%, #424642 16%)',
    // backgroundColor: '#424642',
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    width: 60,
    marginTop: 5,
    marginBottom: 5
  },
  button: {
    backgroundColor: '#F8D800',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
  }
}));

export default Header;
