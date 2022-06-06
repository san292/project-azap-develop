const { Router } = require('express');

const router = Router();

const movieController = require('../controllers/movieController');
const checkConnected = require('../middlewares/checkConnected');

/**
 * Respond with all movies in all libraries for a user
 * @route GET /movies
 * @group Movie
 * @returns {Array<Movie>} 200 - An array of all user's movies
 * @returns {string} 500 - An error message
 */
router.get('/movies', checkConnected, movieController.findAllMoviesUser);

/**
 * Add a new movie in database (when a user adds a movie to one of his libraries)
 * @route POST /movie/{movie_id}/add/{library_id}
 * @group Movie
 * @param {number} movie_id.path.required The movie_id of the movie to add
 * @param {number} library_id.path.required The library_id of the user to add movie
 * @returns {Movie} 201 - The newly added movie
 * @returns {string} 500 - An error message
 */
router.post(
  '/movie/:movie_id(\\d+)/add/:library_id(\\d+)',
  checkConnected,
  movieController.addMovie
);

/**
 * Delete a movie in database
 * @route DELETE /movie/{movie_id}/delete
 * @group Movie
 * @param {number} id_themoviedb.path.required The id of the movie to delete
 * @returns {string} 200 - Successful deletion
 * @returns {string} 500 - An error message
 */
router.delete(
  '/movie/:movie_id(\\d+)/delete',
  checkConnected,
  movieController.deleteMovie
);

module.exports = router;
