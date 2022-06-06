const { Router } = require("express");

const router = Router();

const apiSearchController = require("../controllers/apiSearchController");

/**
 * @typedef Movies
 * @property {string} poster_path
 * @property {boolean} adult
 * @property {string} overview
 * @property {string} release_date
 * @property {string} original_title
 * @property {Array} genre_ids
 * @property {number} id
 * @property {string} media_type
 * @property {string} original_language
 * @property {string} backdrop_path
 * @property {number} popularity
 * @property {number} vote_count
 * @property {boolean} video
 * @property {number} vote_average
 */

/**
 * Test route search
 * @route GET /testsearch
 * @group Search
 * @returns { string } 200 - 'Test API Search Azap' if the test is successull
 */
router.get("/testsearch", (_, res) => res.json("Test API Search Azap !"));

/**
 * Search mutlitple models movies, people, tv shows in a single request with fetch through the API
 * @route GET /search/{search}
 * @group Search
 * @param { string } search.path.required A string describing the searched items
 * @returns { Array<Movies> } 200 - An array of movies
 * @returns { string } 500 - An error message
 */
router.get("/search/:search", apiSearchController.searchMulti);

/**
 * Search mutlitple models movies, people, tv shows in a single request with fetch through the API
 * @route GET /topmovies
 * @group Search
 * @returns { Array<Movies> } 200 - An array of movies
 * @returns { string } 500 - An error message
 */
router.get("/topmovies", apiSearchController.topRated);

module.exports = router;
