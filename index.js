require('dotenv').config();
const express = require('express');

const cors = require('cors');
//const session = require("express-session");

// import router
const apiSearchRouter = require('./app/router/apiSearchRouter');
const apiDetailMovie = require('./app/router/apiDetailMovie');
const adminRouter = require('./app/router/adminRouter');
const visitorRouter = require('./app/router/visitorRouter');
const userRouter = require('./app/router/userRouter');
const libraryRouter = require('./app/router/libraryRouter');
const movieRouter = require('./app/router/movieRouter');
const genreRouter = require('./app/router/genreRouter');

const app = express();

const expressSwagger = require('express-swagger-generator')(app);

// const port = process.env.PORT || 5000;
const port = 8000 || 5000;
//const secret = process.env.SESSION_SECRET;

/******* CORS *******/
const corsOptions = {
  origin: '*',
  credentials: true
};

app.use(cors(corsOptions));
/******* END : CORS *******/

// utilisation du req.body via json()
app.use(express.json());

// middlewares des routes
app.use('/v1', apiSearchRouter);
app.use('/v1', adminRouter);
app.use('/v1', apiDetailMovie);
app.use('/v1', visitorRouter);
app.use('/v1', userRouter);
app.use('/v1', libraryRouter);
app.use('/v1', movieRouter);
app.use('/v1', genreRouter);

/************* SWAGGER JS DOC ************/
// initialisation de swagger
let options = {
  swaggerDefinition: {
    info: {
      description: 'Project AZAP (As ZeMovie As Possible)',
      title: 'AZAP',
      version: '1.0.0'
    },
    basePath: '/v1',
    produces: ['application/json', 'application/json'],
    schemes: ['https'],
    securityDefinitions: {
      /* basicAuth: {
                type: 'basic',
                description: "Authentification basique pour l'API AZAP",
            }, */
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'Authentification avec un jeton JWT'
      }
    },
    security: [{ JWT: [] }]
  },
  basedir: __dirname, //app absolute path
  files: ['./app/**/*.js'] //Path to the API handle folder
};

// Lancement swagger
expressSwagger(options);

// Lorsque j'appelle la route "/" je redirige vers la page /api-docs
app.get('/', (_, response) => {
  response.redirect('/api-docs');
});

/********** SERVER INIT ********/
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
