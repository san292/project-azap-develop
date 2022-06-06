const { Router } = require("express");

const router = Router();

const visitorController = require("../controllers/visitorController");

/**
 * Adds a new user in database
 * @route POST /signup
 * @group Users
 * @param {User.model} object.body.required User object to add in database
 * @returns {User.model} 201 - The newly created user
 * @returns {string} 409 - An error message email already used
 * @returns {string} 422 - An error message invalid email format
 * @returns {string} 500 - An error message
 */
router.post("/signup", visitorController.signup);

module.exports = router;
