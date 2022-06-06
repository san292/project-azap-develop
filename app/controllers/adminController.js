const User = require('../models/user');
const Library = require('../models/library');

const adminController = {
  // lister de tous les users inscrits
  showAllUsers: async (_, res) => {
    try {
      // 1. cherche tous les users
      const users = await User.findAll();
      // console.log("🚀 ~ users", users)

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      let message = 'Une erreur est survenue ! ';
      res.status(500).json(message);
    }
  },

  // supprimer un compte spécifique
  deleteUserAccount: async (req, res) => {
    try {
      // 1. recupération user_id
      const user_id = parseInt(req.params.user_id, 10);
      console.log('🚀 ~ user_id', user_id);

      // 2. on trouve le user en BDD
      const user = await User.findOne(user_id);
      // on recupére le username pour personaliser le message de retour
      let username = user.username;

      // 3. Suppression des libraries liées à ce compte
      await Library.deleteAllLibrary(user_id);

      // 4. Suppression du User
      await user.delete();
      // console.log("🚀 ~ users", users)

      //  5. message de succes
      let message = `Le compte user: ${username} a bien été supprimé !`;
      res.status(200).json(message);
    } catch (error) {
      console.log(error);
      const message = 'Une erreur est survenue ! ';
      res.status(500).json(message);
    }
  }
};

module.exports = adminController;
