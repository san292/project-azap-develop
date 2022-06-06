const { Router } = require('express');

const router = Router();

const libraryController = require('../controllers/libraryController');

/**
 * @typedef Movie
 * @property {integer} id_themoviedb Movie id in APi the movie database
 * @property {boolean} seen Movie has been seen or not by user
 */
/**
 * Get a random movie from a library
 * @route GET /libraries/{library_id}/random
 * @group Libraries
 * @param {integer} library_id.path.required Library id
 * @returns {Movie.model} 200 - The random selected movie
 * @returns {string} 500 - An error message
 */
router.get('/libraries/:library_id/random', libraryController.random);

/**
 * Respond with all libraries in database of a user
 * @route GET /libraries
 * @group Libraries
 * @param {integer} library_id.session.required Library id
 * @returns {Array<Library>} 200 - An array of Libraries
 * @returns {string} 500 - An error message
 */
router.get('/libraries', libraryController.findAllByUser);

/**
 * Respond with all movies in library
 * @route GET /librairies/{library_id}
 * @group Libraries
 * @param {number} library_id.path.required id of the library from which to show movies
 * @returns {Array<Movie>} 200 - An array of Movies
 * @returns {string} 500 - An error message
 */
router.get('/libraries/:library_id', libraryController.showMovies);

/**
 * Add a new library in database of a user
 * @route POST /libraries/add
 * @group Libraries
 * @returns {Library} 200 - An new library was created
 * @returns {string} 500 - An error message
 */
router.post('/libraries/add', libraryController.addLibrary);

/**
 * Delete a  library in database of a user
 * @route DELETE /libraries/{library_id}/delete
 * @group Libraries
 * @param {number} library_id.path.required The library_id of the user to delete
 * @returns {Library} 200 - An library was deleted
 * @returns {string} 500 - An error message
 */
router.delete(
  '/libraries/:library_id(\\d+)/delete',
  libraryController.deleteLibrary
);

/**
 * Update a  library in database of a user
 * @route PUT /libraries/{library_id}/edit
 * @group Libraries
 * @param {number} library_id.path.required The library_id of the user to update
 * @returns {Library} 200 - An library was deleted
 * @returns {string} 500 - An error message
 */
router.put(
  '/libraries/:library_id(\\d+)/edit',
  libraryController.updateLibrary
);

module.exports = router;
