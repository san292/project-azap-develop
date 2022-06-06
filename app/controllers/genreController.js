const fetch = require("node-fetch");

const genreController = {
    // requête pour rechercher la liste des genres et l'envoyer au front
    getListGenre: async (req, res, next) => {
        const list = await fetch(
            `${process.env.BASE_URL}genre/movie/list?api_key=${process.env.API_KEY}&language=${process.env.DEFAULT_LANGUAGE}`
        ).then((response) => response.json());
        // j'envoie les données
        res.json(list.genres);
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

module.exports = genreController;