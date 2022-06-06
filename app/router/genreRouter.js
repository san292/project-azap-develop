const { Router } = require("express");

const router = Router();

const genreController = require("../controllers/genreController");

/**
 * @typedef Genre
 * @property { integer } id The genre id
 * @property { string } name The genre name
 */

/**
 * Get the list of official genres for movies
 * @route GET /genres
 * @group Genre
 * @returns { Array<Genre> } 200 - An array of genre
 * @returns { string } 500 - An error message
 */
router.get("/genres", genreController.getListGenre);


module.exports = router;