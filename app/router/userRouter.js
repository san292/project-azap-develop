const { Router } = require('express');

const router = Router();

const userController = require('../controllers/userController');

/**
 * Logs in the user
 * @route POST /login
 * @group Users
 * @param {object} json.body.required User email and User password
 * @returns {User.model} 200 - The connected user
 * @returns {string} 401 - An error message invalid password
 * @returns {string} 404 - An error message user not found
 * @returns {string} 500 - An error message
 */
router.post('/login', userController.login);

/**
 * Disconnect the user
 * @route get /logout
 * @group Users
 * @returns {string} 200 - message with username to say goodbye
 * @returns {string} 500 - An error message
 */
router.get('/logout', userController.logout);

/**
 * Update password user in database
 * @route PUT /password/reset
 * @group Users
 * @param {string} password.body.required Password User modify in database
 * @returns {*} 204 - The password has been updated
 * @returns {string} 500 - An error message
 */
router.put('/password/reset', userController.password);

/**
 * Respond with all users in database
 * @route GET /users
 * @group Users
 * @returns {Array<User>} 200 - An array of users
 * @returns {string} 500 - An error message
 */
router.get('/users', userController.findAll);

/**
 * Delete user in database
 * @route DELETE /account/delete
 * @group Users
 * @returns {*} 204 - The password has been updated
 * @returns {string} 500 - An error message
 */
router.delete('/account/delete', userController.delete);

/**
 * Update email user in database
 * @route PUT /account/email/reset
 * @group Users
 * @param {string} email.body.required Email User modify in database
 * @returns {*} 204 - The mail has been updated
 * @returns {string} 500 - An error message
 */
router.put('/account/email/reset', userController.email);

/**
 * Update username user in database
 * @route PUT /account/username/reset
 * @group Users
 * @param {string} username.body.required Username User modify in database
 * @returns {*} 204 - The username has been updated
 * @returns {string} 500 - An error message
 */
router.put('/account/username/reset', userController.username);

module.exports = router;
