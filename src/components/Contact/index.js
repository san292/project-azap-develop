// == Import NPM
import React from 'react';
import { Link } from 'react-router-dom';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';

/**
 * @name Contact
 * @param {string} mailto - AZAP email
 * @param {string} label - text in label contact
 */
const Contact = ({ mailto, label }) => {
  const classes = useStyles();
  return (
    <Link
      className={classes.contact}
      to="/contact"
      onClick={(event) => {
        window.location = mailto;
        event.preventDefault();
      }}
    >
      {label}
    </Link>
  );
};
// == Css styles
const useStyles = makeStyles(() => ({
  contact: {
    fontSize: 15,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.87)',
    paddingLeft: 2
  }
}));

export default Contact;
