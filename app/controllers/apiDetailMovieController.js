const fetch = require("node-fetch");

const apiDetailMovie = {
  // Display details of a movie
  movieDetail: async (req, res, next) => {
    const movie_id = parseInt(req.params.movie_id, 10);

    const movie = await fetch(
      `${process.env.BASE_URL}movie/${movie_id}?api_key=${process.env.API_KEY}&language=${process.env.DEFAULT_LANGUAGE}`
    ).then((response) => response.json());

    // j'envoie les données
    res.json(movie);
  },
};

module.exports = apiDetailMovie;
