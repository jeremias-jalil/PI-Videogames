const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require('../db.js');
const { Op } = require("sequelize");


const include = [
    {
        model: Genre,
        through: {
            attributes: []
        }
    },
    {
        model: Platform,
        through: {
            attributes: []
        }
    }]


function extractDataApi(game) {
    return {
        id: game.id,
        name: game.name,
        dateRelease: game.released,
        rating: game.rating,
        plataforms: game.parent_platforms?.map(p => { return { id: p.platform.id, name: p.platform.name } }),
        genre: game.genres?.map(g => { return { id: g.id, name: g.name } }),
        image: game.background_image,
    }
}


function dbConcat(gamesApiResults = [], gamesDb = [], search) {

    if (gamesApiResults.data.count === 0 && gamesDb.length === 0) {
        res.json('No se encontraron coincidencias')
    }

    else {
        const gamesApi = gamesApiResults.data.results?.map(game => extractDataApi(game))

        const games = gamesDb.concat(gamesApi)

        if (search) {
            return games.slice(0, 14)
        }
        else {
            return games
        }
    }
}


async function getGames() {

    const gamesApiResults = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const gamesDb = await Videogame.findAll({
        include: include
    });

    return dbConcat(gamesApiResults, gamesDb)

}


async function searchForName(search) {
    const gamesApiResults = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${search}`)
    const gamesDb = await Videogame.findAll({
        where: {
            name: {
                [Op.substring]: `${search}`
            }
        },
        include: include
    });

    return dbConcat(gamesApiResults, gamesDb, true)
}


async function searchById(search) {
    if (typeof search === 'number') {
        const gamesApiResults = await axios.get(`https://api.rawg.io/api/games/${search}?key=${API_KEY}`)
        return extractDataApi(gamesApiResults.data)
    }

    else {

        let gamesDb = await Videogame.findByPk(search, {
            include: include
        })

        if (gamesDb) {
            return gamesDb
        }
        else {
            return 'No se encuentra dicho id en DB'
        }


    }


}

async function addDbGame(data) {
    const { name, description, dateRelease, rating, platforms, genres } = data   //genres es un array de ID de generos

    const game = await Videogame.create({ name, description, dateRelease, rating, platforms });

    const gameGenre = genres.map(async (id) => {
        const genre = await Genre.findByPk(id)     //busco la el registro genero por ID,
        game.addGenre(genre)                             //le agrego ese registro por medio de la tabla intermedia.
    });

    const gamePlatform = platforms.map(async (id) => {
        const platform = await Platform.findByPk(id)     //busco la el registro genero por ID,
        game.addPlatform(platform)                             //le agrego ese registro por medio de la tabla intermedia.
    });

    await Promise.all(gameGenre)
    await Promise.all(gamePlatform)

    return game
}

module.exports = {
    searchForName,
    getGames,
    searchById,
    addDbGame
}



