const db = require("../database");

class NoUserError extends Error {
    constructor(id) {
        super(`No User found with id ${id}`);
    }
}

/**
 * @typedef User
 * @property {integer} id
 * @property {string} email format email
 * @property {string} username
 * @property {string} password format hashed
 * @property {boolean} adult
 * @property {string} role
 */

class User {
    //on référence l'erreur custom en tant que propriété statique du modèle pour pouvoir tester la class d'une erreur dans le contrôleur sans avoir à importer la classe de l'erreur
    static NoUserError = NoUserError;

    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    /**
     * Retrieves all users from database
     * @static
     * @async
     * @returns {Array<User>} all users in database
     * @throws {Error} an error object
     */
    static async findAll() {
        try {
            const { rows } = await db.query('SELECT * FROM "user"');
            return rows.map((row) => new User(row));      
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            } else {
                throw error;
            }
        }
    }

    /**
     * Retrieves a user from database
     * @static
     * @async
     * @param {number} id
     * @returns {User} the instance identified with its id
     * @throws {Error} an error object
     */
    static async findOne(id) {
        try {
            const { rows } = await db.query(
                'SELECT * FROM "user" WHERE id=$1',
                [id]
            );
            if (rows[0]) {
                return new User(rows[0]);
            } else {
                throw new NoUserError(id);
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
     * Retrieves a user from database
     * @static
     * @async
     * @param {string} email
     * @returns {User} the instance identified with its email
     * @throws {Error} an error object
     */
    static async findOneByEmail(email) {
        const { rows } = await db.query('SELECT * FROM "user" WHERE email=$1', [
            email,
        ]);
        if (rows[0]) {
            return new User(rows[0]);
        } else {
            return null;
        }
    }

    /**
     * Adds or updates an instance of User in database
     * @async
     * @returns {User} the inserted or updated instance
     * @throws {Error} An Error object
     */
    async create() {
        try {
            const { rows } = await db.query("SELECT id FROM add_user($1)", [
                this,
            ]);
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
     * Update an instance of User in database
     * @async
     * @throws {Error} An Error object
     */
    async update() {
        try {
            await db.query("SELECT update_user($1)", [this]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            } else {
                throw error;
            }
        }
    }

    /**
     * Delete an instance of User in database
     * @async
     * @throws {Error} An Error object
     */
    async delete() {
        if (this.id) {
            try {
                const preparedQuery = {
                    text: 'DELETE FROM "user" WHERE id = $1',
                    values: [this.id],
                };

                // supprime l'user de la bdd grâce à son id
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

module.exports = User;