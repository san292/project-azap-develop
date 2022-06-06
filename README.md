# project-azap

# readme front

Have you ever spent an entire hour looking for a movie to watch tonight in front of your HAVSTA Ikea media library or on platforms? Have you ever bought the same movie twice while it sits quietly above your TV cabinet? We got you! AZAP is intended as a film management application, in which the user can create their own lists, classified, sorted and follow the content they wish to see and / or buy. This application makes it easy to navigate on an interface designed primarily for mobile phones. The application is intended for all audiences and especially for moviegoers who want to be able to efficiently manage the films they own or would like to see and have.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# readme back

This project is an application to manage film libraries through the API The Movie Database.

# Stack technique

- [NodeJS](https://nodejs.org/en/download) (v12 ou supérieures)
- [Express](https://expressjs.com/) (v4)
- [PostgreSQL](https://www.postgresql.org/download/) (v12 ou supérieures)
- [Sqitch](https://sqitch.org/download/) (v1 ou supérieures)
- [JSDoc](https://jsdoc.app/)

Ces outils sont nécessaires à l'installation et au fonctionnement de l'application.
À installer avant de continuer.

# Installation

Cloner le dépôt en local

```bash
git clone git@github.com:O-clock-Sinbad/project-azap.git
```

Puis dans le dossier local, installer les dépendances npm

```bash
npm install
```

Mettre en place les fichiers .env et sqitch.conf en s'appuyant sur les fichiers .example fournis dans le dépôt

Enfin, créer une base de données PostgreSQL et déployer le projet sqitch dessus

```bash
createdb azap
sqitch deploy db:pg:azap
```

# Données de démonstration

Afin de mettre en place quelques données de test, lancer depuis le dossier du dépôt

```bash
psql -d azap -f ./data/azapSeed.sql
```

# Lancement

```bash
npm start
```