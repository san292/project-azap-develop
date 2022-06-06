// const User = require('../models/user');
// const Library = require('../models/library');
// const bcrypt = require('bcrypt');

// const userController = {
//   login: async (req, res) => {
//     try {
//       // 1. Authentification
//       const { email, password } = req.body;
//       let message;
//       //  on cherche dans la bdd le record correspondant au email fournit
//       const user = await User.findOneByEmail(email);

//       if (!user) {
//         // l'utilisateur n'existe pas
//         message = "Cet utilisateur n'exite pas !";
//         return res.status(404).json(message);
//       }

//       // User existe => on compare les mdp
//       /*  const isPasswordValid = bcrypt.compareSync(password, user.password);
//             if (!isPasswordValid) {
//                 // les mots de passes ne collent pas
//                 message = "La mot de passe n'est pas valide ! ";
//                 return res.status(401).json(message);
//             } */

//       // 2. Mise à jour de la session
//       // Email et Password sont trouvés en BDD et validés
//       // on enregistre l'utilisateur dans la session
//       req.session.user = user;

//       // je supprimer la propriété "password" de l'utilisateur stocké en session par securité
//       req.session.user.password = null;
//       // console.log("🚀 ~ req.session.user", req.session.user)

//       // 3. Réponse au client
//       message = `Bienvenue ${user.username} !`;
//       res.status(200).json(message);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json('Une erreur est survenue ! ');
//     }
//   },

//   logout: async (req, res) => {
//     // se deconnecter

//     // personalisation du message de logout
//     let username = req.session.user.username;

//     // on supprime la session active
//     delete req.session.user;

//     // on termine la requête
//     let message = `Hasta la Proxima ${username} ! `;
//     res.status(200).json(message);
//   },

//   findAll: async (_, res) => {
//     try {
//       const users = await User.findAll();
//       res.json(users);
//     } catch (error) {
//       res.status(500).json(error.message);
//     }
//   },

//   password: async (req, res) => {
//     try {
//       // on récupère l'id de l'user
//       const id = parseInt(req.session.user.id, 10);
//       // on utilise les données du formulaire pour modifier le password
//       const { password } = req.body;

//       //  On recherche l'utilisateur par son id
//       const user = await User.findOne(id);

//       //  hasher le password
//       let salt = 10;
//       const encryptedPassword = bcrypt.hashSync(password, salt);

//       // mis à jour du mot de passe chez le user
//       user.password = encryptedPassword;

//       // mise à jour dans dans bdd
//       await user.update();

//       //  code status 200 tout est ok
//       res.status(200).json('Le mot de passe a bien été modifié');
//     } catch (error) {
//       res.status(500).json(error.message);
//     }
//   },

//   email: async (req, res) => {
//     try {
//       // on récupère l'id de l'user
//       const id = parseInt(req.session.user.id, 10);
//       // on utilise les données du formulaire pour modifier l'email
//       const { email } = req.body;

//       //  On recherche l'utilisateur par son id
//       const user = await User.findOne(id);

//       // mis à jour de l'email chez le user
//       user.email = email;

//       // mise à jour dans dans bdd
//       await user.update();

//       //  code status 200 tout est ok
//       res.status(200).json('Le mail a bien été modifié');
//     } catch (error) {
//       res.status(500).json(error.message);
//     }
//   },

//   username: async (req, res) => {
//     try {
//       // on récupère l'id de l'user
//       const id = parseInt(req.session.user.id, 10);
//       // on utilise les données du formulaire pour modifier l'email
//       const { username } = req.body;

//       //  On recherche l'utilisateur par son id
//       const user = await User.findOne(id);

//       // mis à jour de l'email chez le user
//       user.username = username;

//       // mise à jour dans dans bdd
//       await user.update();

//       //  code status 200 tout est ok
//       res.status(200).json('Le pseudo a bien été modifié');
//     } catch (error) {
//       res.status(500).json(error.message);
//     }
//   },

//   delete: async (req, res) => {
//     try {
//       // on récupère l'id de l'user
//       const id = parseInt(req.session.user.id, 10);

//       // on cherche l'user à delete par son id
//       const user = await User.findOne(id);

//       // on delete les libraries de l'User
//       await Library.deleteAllLibrary(id);

//       // je supprime la session de l'user
//       delete req.session.user;

//       // delete User
//       await user.delete();

//       //  code status 200 tout est ok
//       res.status(200).json('Le compte a bien été supprimé');
//     } catch (error) {
//       res.status(500).json(error.message);
//     }
//   }
// };

// module.exports = userController;
const User = require('../models/user');
const Library = require('../models/library');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  login: async (req, res) => {
    console.log('hoooooooooooooola');
    let message = '';
    const SECRET_KEY = process.env.SECRET_KEY;
    console.log('process.env.SECRET_KEY signin', process.env.SECRET_KEY);

    try {
      // 1. Authentification
      //const { email, password } = req.body;
      // redifinir const en let sinon on peut changer sa valeur
      let { email, password } = req.body;
      // supprimer les espaces si il yen a :
      email = email.trim();
      password = password.trim();
      //  on cherche dans la bdd le record correspondant à l'email fournit
      const user = await User.findOneByEmail(email);
      console.log('user------------->', user);

      if (!user) {
        // l'utilisateur n'existe pas
        message = "Cet utilisateur n'exite pas !";
        return res.status(404).json(message);
      }

      //User existe => on compare les mdp
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        //les mots de passes ne collent pas
        message = "Le mot de passe n'est pas valide ! ";
        return res.status(401).json(message);
      }

      // je supprimer la propriété "password" de l'utilisateur stocké en session par securité
      delete user.password;

      // mise en place du token
      const expireIn = 24 * 60 * 60;
      const token = jwt.sign(
        {
          user: user
        },
        SECRET_KEY,
        {
          expiresIn: expireIn
        }
      );

      // retour reponse avec message success
      console.log('test user ', user, token);

      // window.localStorage.setItem('user', user);
      return res.status(200).json({
        message: 'authentification successful',
        user,
        token
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  logout: async (req, res) => {
    // se deconnecter
    // personalisation du message de logout
    let username = req.user.user.username;
    // on supprime la session active
    delete req.user.user;
    // on termine la requête
    let message = `Hasta la Proxima ${username} ! `;
    res.status(200).json(message);
  },
  findAll: async (_, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  password: async (req, res) => {
    try {
      // on récupère l'id de l'user
      const id = parseInt(req.user.user.id, 10);
      // on utilise les données du formulaire pour modifier le password
      const { password } = req.body;

      //  On recherche l'utilisateur par son id
      const user = await User.findOne(id);

      //  hasher le password
      let salt = 10;
      const encryptedPassword = bcrypt.hashSync(password, salt);

      // mis à jour du mot de passe chez le user
      user.password = encryptedPassword;

      // mise à jour du mot de passe dans la bdd
      await user.update();

      //  code status 200 tout est ok
      res.status(200).json('Le mot de passe a bien été modifié');
    } catch (error) {
      res.status(500).json(error);
    }
  },

  email: async (req, res) => {
    try {
      // on récupère l'id de l'user
      const id = parseInt(req.user.user.id, 10);
      // on utilise les données du formulaire pour modifier l'email
      const { email } = req.body;

      //  On recherche l'utilisateur par son id
      const user = await User.findOne(id);

      // mis à jour de l'email chez le user
      user.email = email;

      // mise à jour dans dans bdd
      await user.update();

      //  code status 200 tout est ok
      res.status(200).json('Le mail a bien été modifié');
    } catch (error) {
      res.status(500).json(error);
    }
  },

  username: async (req, res) => {
    try {
      // on récupère l'id de l'user
      const id = parseInt(req.user.user.id, 10);
      // on utilise les données du formulaire pour modifier l'email
      const { username } = req.body;

      //  On recherche l'utilisateur par son id
      const user = await User.findOne(id);

      // mis à jour de l'email chez le user
      user.username = username;

      // mise à jour dans dans bdd
      await user.update();

      //  code status 200 tout est ok
      res.status(200).json('Le pseudo a bien été modifié');
    } catch (error) {
      res.status(500).json(error);
    }
  },

  delete: async (req, res) => {
    try {
      // on récupère l'id de l'user
      const id = parseInt(req.user.user.id, 10);

      // on cherche l'user à delete par son id
      const user = await User.findOne(id);

      // on delete les libraries de l'User
      await Library.deleteAllLibrary(id);

      // je supprime la session de l'user
      delete req.user.user;

      // delete User
      await user.delete();

      //  code status 200 tout est ok
      res.status(200).json('Le compte a bien été supprimé');
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = userController;

// const User = require("../models/user");
// const Library = require("../models/library");
// const bcrypt = require("bcrypt");

// const userController = {
//     login: async (req, res) => {
//         try {
//             // 1. Authentification
//             const { email, password } = req.body;
//             let message;
//             //  on cherche dans la bdd le record correspondant au email fournit
//             const user = await User.findOneByEmail(email);

//             if (!user) {
//                 // l'utilisateur n'existe pas
//                 message = "Cet utilisateur n'exite pas !";
//                 return res.status(404).json(message);
//             }

//             // User existe => on compare les mdp
//             /*  const isPasswordValid = bcrypt.compareSync(password, user.password);

//             if (!isPasswordValid) {
//                 // les mots de passes ne collent pas
//                 message = "La mot de passe n'est pas valide ! ";
//                 return res.status(401).json(message);
//             } */

//             // 2. Mise à jour de la session
//             // Email et Password sont trouvés en BDD et validés
//             // on enregistre l'utilisateur dans la session
//             req.session.user = user;

//             // je supprimer la propriété "password" de l'utilisateur stocké en session par securité
//             req.session.user.password = null;
//             // console.log("🚀 ~ req.session.user", req.session.user)

//             // 3. Réponse au client
//             message = `Bienvenue ${user.username} !`;
//             res.status(200).json(message);
//         } catch (error) {
//             console.log(error);
//             res.status(500).json("Une erreur est survenue ! ");
//         }
//     },

//     logout: async (req, res) => {
//         // se deconnecter

//         // personalisation du message de logout
//         let username = req.session.user.username;

//         // on supprime la session active
//         delete req.session.user;

//         // on termine la requête
//         let message = `Hasta la Proxima ${username} ! `;
//         res.status(200).json(message);
//     },

//     findAll: async (_, res) => {
//         try {
//             const users = await User.findAll();
//             res.json(users);
//         } catch (error) {
//             res.status(500).json(error.message);
//         }
//     },

//     password: async (req, res) => {
//         try {
//             // on récupère l'id de l'user
//             const id = parseInt(req.session.user.id, 10);
//             // on utilise les données du formulaire pour modifier le password
//             const { password } = req.body;

//             //  On recherche l'utilisateur par son id
//             const user = await User.findOne(id);

//             //  hasher le password
//             let salt = 10;
//             const encryptedPassword = bcrypt.hashSync(password, salt);

//             // mis à jour du mot de passe chez le user
//             user.password = encryptedPassword;

//             // mise à jour dans dans bdd
//             await user.update();

//             //  code status 200 tout est ok
//             res.status(200).json("Le mot de passe a bien été modifié");
//         } catch (error) {
//             res.status(500).json(error.message);
//         }
//     },

//     email: async (req, res) => {
//         try {
//             // on récupère l'id de l'user
//             const id = parseInt(req.session.user.id, 10);
//             // on utilise les données du formulaire pour modifier l'email
//             const { email } = req.body;

//             //  On recherche l'utilisateur par son id
//             const user = await User.findOne(id);

//             // mis à jour de l'email chez le user
//             user.email = email;

//             // mise à jour dans dans bdd
//             await user.update();

//             //  code status 200 tout est ok
//             res.status(200).json("Le mail a bien été modifié");
//         } catch (error) {
//             res.status(500).json(error.message);
//         }
//     },

//     username: async (req, res) => {
//         try {
//             // on récupère l'id de l'user
//             const id = parseInt(req.session.user.id, 10);
//             // on utilise les données du formulaire pour modifier l'email
//             const { username } = req.body;

//             //  On recherche l'utilisateur par son id
//             const user = await User.findOne(id);

//             // mis à jour de l'email chez le user
//             user.username = username;

//             // mise à jour dans dans bdd
//             await user.update();

//             //  code status 200 tout est ok
//             res.status(200).json("Le pseudo a bien été modifié");
//         } catch (error) {
//             res.status(500).json(error.message);
//         }
//     },

//     delete: async (req, res) => {
//         try {
//             // on récupère l'id de l'user
//             const id = parseInt(req.session.user.id, 10);

//             // on cherche l'user à delete par son id
//             const user = await User.findOne(id);

//             // on delete les libraries de l'User
//             await Library.deleteAllLibrary(id);

//             // je supprime la session de l'user
//             delete req.session.user;

//             // delete User
//             await user.delete();

//             //  code status 200 tout est ok
//             res.status(200).json("Le compte a bien été supprimé");
//         } catch (error) {
//             res.status(500).json(error.message);
//         }
//     },
// };

// module.exports = userController;
