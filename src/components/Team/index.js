// == Import NPM
import React from 'react';
// == Import library @material-ui
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from '@material-ui/core/styles';
// == Import image
import teamazap from '../../images/team-azap.jpg';

const Team = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Team AZAP
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              La team-AZAP est constituée de deux développeurs back-end Estelle
              et Antony, et de trois développeurs front-end Maeva San et
              Yannick.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {/* Anthony */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={teamazap}
                  title="Team AZAP"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Anthony
                  </Typography>
                  <Typography>Scrum Master & Dev Back</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <LinkedInIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <GitHubIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <TwitterIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <MailOutlineIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            {/* Estelle */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={teamazap}
                  title="Team AZAP"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Estelle
                  </Typography>
                  <Typography>Lead Dev Back & Git Master</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <LinkedInIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <GitHubIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <TwitterIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <MailOutlineIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            {/* Maeva */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={teamazap}
                  title="Team AZAP"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Maeva
                  </Typography>
                  <Typography>Product Owner & Dev Front</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <LinkedInIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <GitHubIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <TwitterIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <MailOutlineIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            {/* San */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={teamazap}
                  title="Team AZAP"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    San
                  </Typography>
                  <Typography>Git Master & Dev Front</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <LinkedInIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <GitHubIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <TwitterIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <MailOutlineIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            {/* Yannick */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={teamazap}
                  title="Team AZAP"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Yannick
                  </Typography>
                  <Typography>Lead Dev Front</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <LinkedInIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <GitHubIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <TwitterIcon />
                  </Button>
                  <Button size="small" color="primary">
                    <MailOutlineIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

// == Css styles
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));
export default Team;
