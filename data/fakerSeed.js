const faker = require('faker');
faker.local = 'fr';

const dotenv = require('dotenv');
dotenv.config();

const database = require('../app/database.js');

// create function to fill database user
const seed_user = async () => {
  // console.log('debut de la fonction user')
  try {
    for (let i = 0; i < 10; i++) {
      // Email pour chaque user
      let email = faker.unique(faker.internet.email);
      let username = faker.unique(faker.internet.userName);
      let password = faker.unique(faker.internet.password);

      const preparedQuery = {
        text: 'INSERT INTO "user"(email, username, password, role) VALUES ($1, $2, $3, $4)',
        values: [email, username, password, 'member']
      };

      await database.query(preparedQuery);
    }
  } catch (error) {
    console.error(error);
  }
  // console.log('Fin de la fonction user')
};

// create function to fill database library
const seed_library = async () => {
  // console.log('debut de la fonction library');

  try {
    // on determine le nombre de bibliothèque par user (random number entre 1 et 10)
    const libraryNumberPerUser = Math.floor(Math.random() * 10) + 1;

    // on créer un tableau avec les id des user sur lequel on pourra itérer
    const resultUserIds = await database.query('SELECT id from "user"');
    const userIds = resultUserIds.rows;
    // console.log("🚀 ~ rows", rows)

    // pour chaque user on ajoute le nombre de bibliothèque pré-définit
    for (const element of userIds) {
      // on ajoute autant de record en Bdd qu'il y a de bibliothèque pour un user
      for (let i = 0; i < libraryNumberPerUser; i++) {
        // Name for library
        let name = faker.unique(faker.random.words);

        const preparedQuery = {
          text: 'INSERT INTO "library"(name, user_id) VALUES ($1, $2)',
          values: [name, element.id]
        };

        await database.query(preparedQuery);
        // console.log(name, element.id);
      }
    }
  } catch (error) {
    console.error(error);
  }
  // console.log('Fin de la fonction library');
};

// create function to fill database movie
const seed_movie = async () => {
  // console.log('Début de la fonction movie');
  try {
    for (let i = 0; i < 100; i++) {
      // random number of id_themoviedb (TMDb contains 668 563 movies)
      let id_themoviedb = faker.datatype.number({ min: 7e4, max: 6e5 });

      const preparedQuery = {
        text: 'INSERT INTO "movie"(id_themoviedb) VALUES ($1)',
        values: [id_themoviedb]
      };

      await database.query(preparedQuery);
    }
  } catch (error) {
    console.error(error);
  }
  // console.log('Fin de la fonction movie');
};

// create function to fill database movie
const seed_library_has_movie = async () => {
  // console.log('Début de la fonction library_has_movie');

  try {
    // creation d'un tableau avec tous les Id des bibliothèque
    const resultLibrary = await database.query('SELECT id from library');
    const librayIds = resultLibrary.rows;
    // console.log("🚀 ~ librayIds", librayIds);
    // console.log("🚀 ~ librayIds", librayIds.length);

    // creation d'un tableau avec tous les Id des films
    const resultMovie = await database.query('SELECT id_themoviedb from movie');
    const movieIds = resultMovie.rows;
    // console.log("🚀 ~ movieIds", movieIds);
    // console.log("🚀 ~ movieIds", movieIds.length);

    // Objectif: Pour chaque bibliothèque on pioche X films dans le tableau des films
    // X = un chiffre aléatoire entre 1 et 10
    for (let element of librayIds) {
      // numberOfMovies = le nombre aléatoire de film à piocher (entre 1 et 10)
      const numberOfMovies = Math.floor(Math.random() * 10) + 1;

      for (let i = 0; i < numberOfMovies; i++) {
        // on détermine aléatoirement l'index du tableau dans lequel piocher
        const randomIndex = Math.floor(Math.random() * movieIds.length);
        // console.log("🚀 ~ randomIndex", randomIndex)

        // on insère le film pioché dans la table avec le l'id de la bibliothèque associée
        const preparedQuery = {
          text: 'INSERT INTO "library_has_movie"(id_themoviedb, library_id) VALUES ($1, $2)',
          values: [movieIds[randomIndex].id_themoviedb, element.id]
        };

        await database.query(preparedQuery);
        // console.log(movieIds[randomIndex].id_themoviedb, element.id);
      }
    }
  } catch (error) {
    console.error(error);
  }

  // console.log('Fin de la fonction library_has_movie');
};

// Des fonctions s'execute plus vite que d'autre, cela posait des problèmes parfois
//  => mise en place des await
const seed_all = async () => {
  await seed_user();
  await seed_library();
  await seed_movie();
  await seed_library_has_movie();
  console.log("Attendez jusqu'à la fin des opérations");
};

/*****************************  SEED FUNCTION TO LAUNCH SCRIPT  *****************************/

seed_all();

// const faker = require('faker');
// faker.local = 'fr';

// const dotenv = require('dotenv');
// dotenv.config();

// const database = require('../app/database.js');

// // create function to fill database user
// const seed_user = async () => {
//   // console.log('debut de la fonction user')
//   try {
//     for (let i = 0; i < 10; i++) {
//       // Email pour chaque user
//       let email = faker.unique(faker.internet.email);
//       let username = faker.unique(faker.internet.userName);
//       let password = faker.unique(faker.internet.password);

//       const preparedQuery = {
//         text: 'INSERT INTO "user"(email, username, password, role) VALUES ($1, $2, $3, $4)',
//         values: [email, username, password, 'member']
//       };

//       await database.query(preparedQuery);
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   // console.log('Fin de la fonction user')
// };

// // create function to fill database library
// const seed_library = async () => {
//   // console.log('debut de la fonction library');

//   try {
//     // on determine le nombre de bibliothèque par user (random number entre 1 et 10)
//     const libraryNumberPerUser = Math.floor(Math.random() * 10) + 1;

//     // on créer un tableau avec les id des user sur lequel on pourra itérer
//     const resultUserIds = await database.query('SELECT id from "user"');
//     const userIds = resultUserIds.rows;
//     // console.log("🚀 ~ rows", rows)

//     // pour chaque user on ajoute le nombre de bibliothèque pré-définit
//     for (const element of userIds) {
//       // on ajoute autant de record en Bdd qu'il y a de bibliothèque pour un user
//       for (let i = 0; i < libraryNumberPerUser; i++) {
//         // Name for library
//         let name = faker.unique(faker.random.words);

//         const preparedQuery = {
//           text: 'INSERT INTO "library"(name, user_id) VALUES ($1, $2)',
//           values: [name, element.id]
//         };

//         await database.query(preparedQuery);
//         // console.log(name, element.id);
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   // console.log('Fin de la fonction library');
// };

// // create function to fill database movie
// const seed_movie = async () => {
//   // console.log('Début de la fonction movie');
//   try {
//     for (let i = 0; i < 100; i++) {
//       // random number of id_themoviedb (TMDb contains 668 563 movies)
//       let id_themoviedb = faker.datatype.number({ min: 7e4, max: 6e5 });

//       const preparedQuery = {
//         text: 'INSERT INTO "movie"(id_themoviedb) VALUES ($1)',
//         values: [id_themoviedb]
//       };

//       await database.query(preparedQuery);
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   // console.log('Fin de la fonction movie');
// };

// // create function to fill database movie
// const seed_library_has_movie = async () => {
//   // console.log('Début de la fonction library_has_movie');

//   try {
//     // creation d'un tableau avec tous les Id des bibliothèque
//     const resultLibrary = await database.query('SELECT id from library');
//     const librayIds = resultLibrary.rows;
//     // console.log("🚀 ~ librayIds", librayIds);
//     // console.log("🚀 ~ librayIds", librayIds.length);

//     // creation d'un tableau avec tous les Id des films
//     const resultMovie = await database.query('SELECT id_themoviedb from movie');
//     const movieIds = resultMovie.rows;
//     // console.log("🚀 ~ movieIds", movieIds);
//     // console.log("🚀 ~ movieIds", movieIds.length);

//     // Objectif: Pour chaque bibliothèque on pioche X films dans le tableau des films
//     // X = un chiffre aléatoire entre 1 et 10
//     for (const element of librayIds) {
//       // numberOfMovies = le nombre aléatoire de film à piocher (entre 1 et 10)
//       const numberOfMovies = Math.floor(Math.random() * 10) + 1;

//       for (let i = 0; i < numberOfMovies; i++) {
//         // on détermine aléatoirement l'index du tableau dans lequel piocher
//         const randomIndex = Math.floor(Math.random() * movieIds.length);
//         // console.log("🚀 ~ randomIndex", randomIndex)

//         // on insère le film pioché dans la table avec le l'id de la bibliothèque associée
//         const preparedQuery = {
//           text: 'INSERT INTO "library_has_movie"(id_themoviedb, library_id) VALUES ($1, $2)',
//           values: [movieIds[randomIndex].id_themoviedb, element.id]
//         };

//         await database.query(preparedQuery);
//         // console.log(movieIds[randomIndex].id_themoviedb, element.id);
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }

//   // console.log('Fin de la fonction library_has_movie');
// };

// // Des fonctions s'execute plus vite que d'autre, cela posait des problèmes parfois
// //  => mise en place des await
// const seed_all = async () => {
//   await seed_user();
//   await seed_library();
//   await seed_movie();
//   await seed_library_has_movie();
//   console.log("Attendez jusqu'à la fin des opérations");
// };

// /*****************************  SEED FUNCTION TO LAUNCH SCRIPT  *****************************/

// seed_all();
