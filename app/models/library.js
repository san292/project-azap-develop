const db = require('../database');

class NoLibraryError extends Error {
  constructor(id) {
    super(`No Library found with id ${id}`);
  }
}

/**
 * @typedef Library
 * @property {number} id The library id
 * @property {string} name The library name
 * @property {number} user_id The user id associated to the library
 */

class Library {
  //on référence l'erreur custom en tant que propriété statique du modèle pour pouvoir tester la class d'une erreur dans le contrôleur sans avoir à importer la classe de l'erreur
  static NoLibraryError = NoLibraryError;

  constructor(data = {}) {
    // on fait une boucle sur les proprietes comme ça si on declare une nouvelle colonne
    //dans la bdd elle sera incluse, pas besoin de la rajouter dans le modele
    for (const prop in data) {
      this[prop] = data[prop];
    }
  }

  /**
   * Retrieves all libraries from database
   * @static
   * @async
   * @returns {Array<Library>} all libraries in database
   * @throws {Error} an error object
   */
  static async findAll() {
    try {
      //on destructure l'objet de la reponse recu et on envoi le tableau au front

      const { rows } = await db.query('SELECT * FROM "library"');
      return rows.map((row) => new Library(row));
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      } else {
        throw error;
      }
    }
  }

  /**
   * Retrieves a library from database
   * @static
   * @async
   * @param {number} id The library id
   * @returns {Library} the instance identified with its id
   * @throws {Error} an error object
   */
  static async findOne(id) {
    try {
      const { rows } = await db.query('SELECT * FROM "library" WHERE id=$1', [
        id
      ]);
      if (rows[0]) {
        return new Library(rows[0]);
      } else {
        throw new NoLibraryError(id);
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
   * Retrieves libraries from database with user id
   * @static
   * @async
   * @param {number} id The user id
   * @returns {Library} the instance identified with its user
   * @throws {Error} an error object
   */
  static async findAllByUser(id) {
    try {
      const { rows } = await db.query(
        'SELECT * FROM "library" WHERE user_id=$1',
        [id]
      );
      return rows.map((row) => new Library(row));
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      } else {
        throw error;
      }
    }
  }

  /**
   * Adds an instance of Library in database
   * @async
   * @returns {Library} The newly inserted library
   * @throws {Error} An Error object
   */
  async create() {
    try {
      const { rows } = await db.query('SELECT id FROM add_library($1)', [this]);

      this.id = rows[0].id;
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
   * Update an instance of Library in database
   * @async
   * @throws {Error} An Error object
   */
  async updateLibrary() {
    try {
      await db.query('SELECT update_library($1)', [this]);
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      } else {
        throw error;
      }
    }
  }

  /**
   * Delete an instance of Library in database
   * @async
   * @throws {Error} An Error object
   */
  async deleteLibrary() {
    if (this.id) {
      try {
        const preparedQuery = {
          text: 'DELETE FROM "library" WHERE id = $1',
          values: [this.id]
        };

        // supprime la library de la bdd grâce à son id
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

  /**
   * Delete all instances of Library in database for a user
   * @async
   * @param {number} user_id The user id
   * @throws {Error} An Error object
   */
  static async deleteAllLibrary(user_id) {
    try {
      const preparedQuery = {
        text: 'DELETE FROM "library" WHERE user_id = $1',
        values: [user_id]
      };
      console.log('🚀 ~ preparedQuery', preparedQuery);

      // supprime les libraries de la bdd grâce à son id
      await db.query(preparedQuery);
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      } else {
        throw error;
      }
    }
  }

  /**
   * Display all libraries (including movies) for a user
   * @static
   * @async
   * @param {number} user_id The user id
   * @returns {Library} all libraries and all movies of each library of a user
   * @throws {Error} an error object
   */
  static async findLibAndMovies(user_id) {
    try {
      const { rows } = await db.query('SELECT * from find_lib_and_movies($1)', [
        user_id
      ]);

      return rows;
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail);
      } else {
        throw error;
      }
    }
  }
}

module.exports = Library;
