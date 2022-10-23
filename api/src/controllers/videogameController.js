require("dotenv").config();
const axios = require("axios");
const { API_KEY, API } = process.env;
const {
  Videogame,
  Genre,
  Platform,
  Short_screenshot,
  Apivideogame,
} = require("../db.js");
const { Op } = require("sequelize");

const include = [
  {
    model: Genre,
    through: {
      attributes: [],
    },
  },
  {
    model: Platform,
    through: {
      attributes: [],
    },
  },
  {
    model: Short_screenshot,
  },
];

async function extractDataApi(game) {
    const gameDetail=await axios.get(
        `https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`
      );
  return {
    id: game.id,
    name: game.name,
    dateRelease: game.released,
    rating: game.rating,
    platforms: game.parent_platforms?.map((p) => {
      return { id: p.platform.id, name: p.platform.name };
    }),
    genres: game.genres?.map((g) => {
      return { id: g.id, name: g.name };
    }),
    image:
      game.background_image ||
      "https://gamedustria.com/wp-content/uploads/2015/03/game.jpg",
    description: gameDetail.data.description || "Without description",
    short_screenshots: game.short_screenshots || [],
  };
}

function dbConcat(gamesApiResults = [], gamesDb = []) {
  let games;
  if (gamesApiResults.length === 0 && gamesDb.length === 0) {
    return [];
  } else {
    games = gamesDb.concat(gamesApiResults);
    return games;
  }
}

async function getGames() {
  try {
    const gameApi = await Apivideogame.findAll({
      include: include,
    });
    const gamesDb = await Videogame.findAll({
      include: include,
    });
    return dbConcat(gameApi, gamesDb);
  } catch (err) {
    console.log("db", err);
  }

}

async function searchForName(search) {
  let gamesApiResults = [];
  let gamesDb = [];
  try {
    gamesApiResults = await Apivideogame.findAll({
      where: {
        name: {
          [Op.or]: [
            { [Op.substring]: `${search}` },
            {
              [Op.substring]: `${
                search.charAt(0).toUpperCase() + search.slice(1)
              }`,
            },
          ],
        },
      },
      include: include,
    });
  } catch (err) {
    console.log("db", err);
  }

  try {
    gamesDb = await Videogame.findAll({
      where: {
        name: {
          [Op.or]: [
            { [Op.substring]: `${search}` },
            {
              [Op.substring]: `${
                search.charAt(0).toUpperCase() + search.slice(1)
              }`,
            },
          ],
        },
      },
      include: include,
    });
  } catch (err) {
    console.log("db", err);
  }

  return dbConcat(gamesApiResults, gamesDb);
}

async function searchById(search) {

  if (search * 1) {

    try {
        let gamesApi = await Apivideogame.findByPk(search, {
          include: include,
        });
  
        if (gamesApi) {
          return gamesApi;
        } else {
          return "No se encuentra dicho id en la API";
        }
      } catch (err) {
        console.log("db", err);
      }

  } else {
    try {
      let gamesDb = await Videogame.findByPk(search, {
        include: include,
      });

      if (gamesDb) {
        return gamesDb;
      } else {
        return "No se encuentra dicho id en DB";
      }
    } catch (err) {
      console.log("db", err);
    }
  }
}

async function addDbGame(data) {
  try {
    const {
      id,
      name,
      description,
      dateRelease,
      rating,
      platforms,
      genres,
      image,
      short_screenshots,
    } = data;

    if (!id) {
      const game = await Videogame.create({
        name,
        description,
        dateRelease,
        rating,
        image,
      });

      const gameGenre = genres.map(async (id) => {
        const genre = await Genre.findByPk(id);
        game.addGenre(genre);
      });

      const gamePlatform = platforms.map(async (id) => {
        const platform = await Platform.findByPk(id);
        game.addPlatform(platform);
      });

      const screenshots = short_screenshots.map(async (url) => {
        game.createShort_screenshot({ image: url });
      });

      await Promise.all(gameGenre);
      await Promise.all(gamePlatform);
      await Promise.all(screenshots);

      return game;
    } else {
      const game = await Apivideogame.create({
        id,
        name,
        description,
        dateRelease,
        rating,
        image,
      });

      const gameGenre = genres.map(async (genre) => {
        const genreDb = await Genre.findByPk(genre.id);
        game.addGenre(genreDb);
      });

      const gamePlatform = platforms.map(async (platform) => {
        const platformDb = await Platform.findByPk(platform.id);
        game.addPlatform(platformDb);
      });

      const screenshots = short_screenshots.map(async (images) => {
        game.createShort_screenshot({ image: images.image });
      });

      await Promise.all(gameGenre);
      await Promise.all(gamePlatform);
      await Promise.all(screenshots);

      return game;
    }
  } catch (err) {
    console.log("db", err);
  }
}

async function deleteGame(id) {
  const gameDeleted = await Videogame.destroy({
    where: {
      id: id,
    },
  });
  return gameDeleted;
}

async function apiGamePreload() {
  
  try {
    let allGamesApiResults = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );
    allGamesApiResults = allGamesApiResults.data.results;
    let page = 2;
    while (allGamesApiResults.length < 500) {
      const apiRes = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`
      );
      allGamesApiResults=allGamesApiResults.concat(apiRes.data.results);
       page=page+1
    }

    allGamesApiResults.forEach(async (game) => {
      const dataGame = await extractDataApi(game);
      await addDbGame(dataGame);
    });
  } catch (err) {
    console.log("api", err);
  }
}

module.exports = {
  searchForName,
  getGames,
  searchById,
  addDbGame,
  deleteGame,
  apiGamePreload,
};
