// == Imports NPM
import React from 'react';
import { Link } from 'react-router-dom';
// == Import library @material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
// == Import components
import Contact from '../Contact';

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.footer}>
        <Typography variant="h3" className={classes.footerTitle}>
          © "AZAP" 2021{' '}
        </Typography>
        <Contact
          label="Nous contacter"
          mailto="mailto:azapteamcontact@gmail.com"
        />
        <Typography className={classes.footerGeneralConditions}>
          <Link className={classes.colorLink} to="/general-conditions">
            CGU
          </Link>
        </Typography>
        <Typography className={classes.footerIcon}>
          <Link className={classes.colorLink} to="/team">
            <GroupIcon />
          </Link>
        </Typography>
      </div>
    </>
  );
};
// == Css styles
const useStyles = makeStyles(() => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    padding: 20
  },
  footerTitle: {
    fontSize: 15,
    color: '#F3F4ED'
  },
  footerIcon: {
    fontSize: 15,
    marginLeft: 10
  },
  footerGeneralConditions: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#F3F4ED'
  },
  colorLink: {
    color: '#F3F4ED'
  },
  nousContacter: {
    color: '#F3F4ED'
  }
}));

export default Footer;
