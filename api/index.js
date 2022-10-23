require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
const { Genre, Platform } = require("./src/db");
const e = require("express");
const { API_KEY, PORT } = process.env;
const { apiGamePreload } = require("./src/controllers/videogameController");
const bulean = false;

conn.sync({ force: bulean }).then(async () => {
  try {
    const validation = await Genre.findAll();
    if (!validation.length) {
      const apiGenresResponse = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      const apiGenres = apiGenresResponse.data.results;
      const genres = apiGenres.map((e) => {
        return { id: e.id, name: e.name };
      });
      Genre.bulkCreate(genres);

      const apiPlatformsResponse = await axios.get(
        `https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`
      );
      const apiPlatforms = apiPlatformsResponse.data.results;
      const platforms = apiPlatforms.map((e) => {
        return { id: e.id, name: e.name };
      });
      Platform.bulkCreate(platforms);

      await apiGamePreload();
    }
  } catch (err) {
    console.log(err);
  }

  server.listen(PORT || 3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
