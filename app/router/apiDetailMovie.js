const { Router } = require("express");

const router = Router();

const apiDetailMovie = require("../controllers/apiDetailMovieController");

/**
 * @typedef Movie
 * @property {bolean} adult
 * @property {string} backdrop_path
 * @property {Object} belongs_to_collection
 * @property {number} budget
 * @property {Array} genres
 * @property {Array} genre_ids
 * @property {string} homepage
 * @property {number} id
 * @property {string} imdb_id
 * @property {string} original_language
 * @property {string} original_title
 * @property {string} overview
 * @property {number} popularity
 * @property {string} poster_path
 * @property {Array} production_companies
 * @property {Array} production_countries
 * @property {string} release_date
 * @property {number} revenue
 * @property {number} runtime
 * @property {Array} spoken_languages
 * @property {string} status
 * @property {string} tagline
 * @property {string} title
 * @property {boolean} video
 * @property {number} vote_average
 * @property {number} vote_count
 */

/**
 * Test route detail movie
 * @route GET /testDetailMovie
 * @group Movie
 * @returns { string } 200 - 'Test API detail movie Azap' if the test is successull
 */
router.get("/testDetailMovie", (_, res) =>
  res.json("Test API detail movie Azap !")
);

/**
 * Display details of a movie
 * @route GET /movie/{movie_id}
 * @group Movie
 * @param { number } movie_id.path.required the id of the movie to fetch
 * @returns { Array<Movie> } 200 - An object of details for a movie
 * @returns { string } 500 - An error message
 */
router.get("/movie/:movie_id", apiDetailMovie.movieDetail);

module.exports = router;
