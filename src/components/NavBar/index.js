// == Imports NPM
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SearchIcon from '@material-ui/icons/Search';

/**
 * @function
 * @name TabPanel
 * @param {object} props
 */
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

// == PropTypes of the component TabPanel
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

/**
 * @function
 * @param {any} id
 * @name a11yProps
 */
const a11yProps = (index) => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`
  };
};

/**
 * @function
 * @param {theme} theme
 * @name makeStyles
 */

/**
 * @function
 * @name NavBar
 */
// == Component NavBar
const NavBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        TabIndicatorProps={{
          style: {
            display: 'none'
          }
        }}
        aria-label="scrollable force tabs example"
      >
        <Tab
          label="Accueil"
          component={Link}
          to="/"
          icon={<HomeIcon />}
          {...a11yProps(0)}
          className={classes.icon}
        />
        <Tab
          label="Recherche"
          component={Link}
          to="/search"
          icon={<SearchIcon />}
          {...a11yProps(1)}
          className={classes.icon}
        />
        <Tab
          label="Filmotheque"
          component={Link}
          to="/library"
          icon={<LibraryBooksIcon />}
          {...a11yProps(2)}
          className={classes.icon}
        />
        <Tab
          label="Utilisateur"
          component={Link}
          to="/my-profile"
          icon={<FaceIcon />}
          {...a11yProps(3)}
          className={classes.icon}
        />
      </Tabs>
    </div>
  );
};

// == Css styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    background: 'linear-gradient(45deg, #bdc3c7 10%, #424642 20%)',
    // backgroundColor: "#424642",
    display: 'flex',
    justifyContent: 'center',
    marginTop: 1,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
  },
  icon: {
    color: '#F8D800 !important',
    opacity: 1
  }
}));

export default NavBar;
