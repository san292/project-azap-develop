const User = require('../models/user');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');

const visitorController = {
  signup: async (req, res) => {
    // on utilise les données du formulaire pour enregistrer un compte
    try {
      const { email, password } = req.body;
      let message;

      //  1. email est il déjà utilisé ?
      const existingUser = await User.findOneByEmail(email);

      if (existingUser) {
        message = 'Cet email est déjà utilisé ! ';
        res.status(409).json(message);
      }

      // 2. email est il valide ?
      if (!emailValidator.validate(email)) {
        message = "L'email n'est pas bien formaté !";
        res.status(422).json(message);
      }

      //  3. hashage du mot de passe
      let salt = 10;
      const encryptedPassword = bcrypt.hashSync(password, salt);
      req.body.password = encryptedPassword;

      // 4. creation du nouveau user avec les données du formulaire
      const user = new User(req.body);

      // 5. appel des methodes du model pour enregistrement en BDD
      const newUser = await user.create();

      //  6. Renvoi du nouvel user
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

module.exports = visitorController;
