const { findAllByUser } = require('../models/library');
const Movie = require('../models/movie');

const movieController = {
  // affiche la liste de tous les movies dans toutes les libraries de l'user
  findAllMoviesUser: async (req, res) => {
    try {
      // on récupère l'id de l'user
      const id = parseInt(req.user.user.id, 10);
      console.log('id movieController', id);

      const movies = await Movie.findAllMoviesByUser(id);
      res.json(movies);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // ajoute un movie dans les tables
  addMovie: async (req, res) => {
    try {
      // on récupère l'id du movie dans la route paramétrée
      const id_themoviedb = parseInt(req.params.movie_id, 10);

      // on récupère l'id de la library dans la route paramétrée
      const library_id = parseInt(req.params.library_id, 10);

      // vérification que le movie n'est pas déjà présent dans la library
      const movies = await Movie.findAllMovies(library_id);

      const isPresent = movies.filter(
        (elem) => elem.id_themoviedb === id_themoviedb
      );

      if (isPresent.length) {
        res.status(409).end();
        return;
      }

      // on utilise les données créer un objet pour le transmettre
      // à la création de la nouvelle instance de Movie
      const data = { id_themoviedb: id_themoviedb, seen: false };

      //  On créé une nouvelle instance de Movie
      const movie = new Movie(data);

      // mise à jour dans dans bdd
      const newMovie = await movie.addMovie(library_id);

      //  on renvoie le nouveau movie créé
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteMovie: async (req, res) => {
    try {
      /// on récupère l'id du movie dans la route paramétrée
      const id_themoviedb = parseInt(req.params.movie_id, 10);

      // on cherche le movie à delete par son id
      const movie = await Movie.findOneMovie(id_themoviedb);

      // on delete le movie
      await movie.deleteMovie();

      //  code status 200 tout est ok
      res.status(200).json('Le film a bien été supprimé');
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = movieController;
