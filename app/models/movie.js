const db = require("../database");

class NoMovieError extends Error {
  constructor() {
    super(`No Movies found in your library`);
  }
}

/**
 * @typedef Movie
 * @property {integer} id the id of the movie
 * @property {integer} id_themoviedb Movie id in APi the movie database
 * @property {boolean} seen Movie has been seen or not by user
*/

class Movie {
  //on référence l'erreur custom en tant que propriété statique du modèle pour pouvoir tester la class d'une erreur dans le contrôleur sans avoir à importer la classe de l'erreur
  static NoMovieError = NoMovieError;

  constructor(data = {}) {
    for (const prop in data) {
      this[prop] = data[prop];
    }
  }

  /**
   * Retrieves all movies contained in a library
   * @static
   * @async
   * @param {number} libraryId the id of the library
   * @returns {Array<Movie>} all movies in a library
   * @throws {Error} an error object
   */
  static async findAllMovies(libraryId) {
    try {
      const { rows } = await db.query("SELECT * from find_all_movies($1)", [
        libraryId,
      ]);

      if (!rows) {
        throw new NoMovieError();
      } else {
        return rows.map((row) => new Movie(row));
      }
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      } else {
        throw error;
      }
    }
  }

  /**
     * Retrieves all movies contained in all libraries of user
     * @static
     * @async
     * @param {number} id the user id 
     * @returns {Array<Movie>} all movies in database
     * @throws {Error} an error object
     */
  static async findAllMoviesByUser(id) {
    try {
      const { rows } = await db.query(
        "SELECT * from find_all_movies_by_user($1)",
        [id]
      );

      if (!rows) {
        throw new NoMovieError();
      } else {
        return rows.map((row) => new Movie(row));
      }
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      } else {
        throw error;
      }
    }
  }

  /**
     * Retrieves a movie from database by its specific id
     * @static
     * @async
     * @param {number} id_themoviedb the movie id coming from the movie database
     * @returns {Movie} the instance identified with its specific id
     * @throws {Error} an error object
     */
  static async findOneMovie(id_themoviedb) {
    try {
      const { rows } = await db.query(
        'SELECT * FROM "movie" WHERE id_themoviedb=$1',
        [id_themoviedb]
      );
      if (rows[0]) {
        return new Movie(rows[0]);
      } else {
        throw new NoMovieError(id);
      }
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      } else {
        throw error;
      }
    }
  }

  /**
   * Adds an instance of movie in database
   * @async
   * @param {number} libraryId the id of the library
   * @returns {Movie} the inserted instance
   * @throws {Error} An Error object
   */
  async addMovie(library_id) {
    try {
      // je prépare la requête pour ajouter le movie dans la database movie
      const preparedQueryMovie = {
        text: `
                    INSERT INTO movie(id_themoviedb) VALUES($1) RETURNING *
                `,
        values: [this.id_themoviedb],
      };

      // je récupère un array d'objet
      const { rows } = await db.query(preparedQueryMovie);

      const movie_id = rows[0].id;

      // je prépare la requête pour ajouter le movie dans la database library_has_movie
      const preparedQueryLiaison = {
        text: `
                    INSERT INTO library_has_movie(movie_id, library_id) VALUES($1, $2)
                `,
        values: [movie_id, library_id],
      };
      // je l'envoie sans attendre de résultat
      await db.query(preparedQueryLiaison);

      return this;
    } catch (error) {
      console.log(error);
      if (error.detail) {
        throw new Error(error.detail);
      } else {
        throw error;
      }
    }
  }

  /**
   * Delete an instance of movie in database
   * @async
   * @param {number} id_themoviedb the id_themoviedb of the movie
   * @throws {Error} An Error object
   */
  async deleteMovie() {
    if (this.id_themoviedb) {
      try {
        const preparedQuery = {
          text: 'DELETE FROM "movie" WHERE id_themoviedb = $1 RETURNING *',
          values: [this.id_themoviedb],
        };

        // supprime le movie de la bdd grâce à l'id_themoviedb
        // grâce au ON DELETE CASCADE, cela devrait également supprimer la ligne dans
        // la table librarty_has_movie
        await db.query(preparedQuery);
      } catch (error) {
        if (error.detail) {
          throw new Error(error.detail);
        } else {
          throw error;
        }
      }
    }
  }
}

module.exports = Movie;