const { Router } = require("express");
const adminController = require("../controllers/adminController");

const router = Router();

/**
* Show all users signed in AZAP
* @route GET /admin/users
* @group Admin
* @returns {Array<User>} 200 - The list of Users
* @returns {string} 500 - An error message
 */
router.get("/admin/users", adminController.showAllUsers);

/**
* Delete an user account
* @route GET /delete/{user_id}
* @group Admin
* @param {integer} user_id.path.required User id
* @returns {string} 200 - A succes message on deletion
* @returns {string} 500 - An error message
 */
router.delete("/admin/delete/:user_id", adminController.deleteUserAccount);


module.exports = router;
