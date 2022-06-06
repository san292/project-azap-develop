const fetch = require("node-fetch");

const apiSearchController = {
  // research with api (people, movie, tv show)
  searchMulti: async (req, res, next) => {
    const paramasSearch = req.params;

    const search = await fetch(
      `${process.env.BASE_URL}search/multi?api_key=${process.env.API_KEY}&language=${process.env.DEFAULT_LANGUAGE}&query=${paramasSearch.search}`
    ).then((response) => response.json());

    // j'envoie les données
    res.json(search.results);
  },

  // display top rated
  topRated: async (req, res, next) => {


    const top = await fetch(
      `${process.env.BASE_URL}movie/top_rated?api_key=${process.env.API_KEY}&language=${process.env.DEFAULT_LANGUAGE}`
    ).then((response) => response.json());


    // j'envoie les données
    res.json(top.results);
  },
};

module.exports = apiSearchController;
