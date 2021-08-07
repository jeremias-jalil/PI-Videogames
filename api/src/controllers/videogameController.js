require('dotenv').config();
const axios = require('axios');
const { API_KEY, API } = process.env;
const { Videogame, Genre, Platform, Short_screenshot } = require('../db.js');
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
    }
    ,
    {
        model: Short_screenshot,
        
    }
]


function extractDataApi(game) {

    if (API == 1) {
        return {
            id: game.id,
            name: game.name,
            dateRelease: game.released,
            rating: game.rating,
            platforms: game.parent_platforms?.map(p => { return { id: p.platform.id, name: p.platform.name } }),
            genres: game.genres?.map(g => { return { id: g.id, name: g.name } }),
            image: game.background_image || 'https://gamedustria.com/wp-content/uploads/2015/03/game.jpg',
            description: game.description || 'Without description',
            short_screenshots: game.short_screenshots || []
        }
    }

    if (API == 2) {
        return {
            id: game.id,
            name: game.title,
            dateRelease: game.release_date,
            platforms: game.platform,
            genre: game.genre,
            image: game.thumbnail,
            description: game.description || game.short_description
        }
    }
}


function dbConcat(gamesApiResults = [], gamesDb = [], search) {


    if (gamesApiResults.data?.count === 0 && gamesDb.length === 0) {
        res.json('No se encontraron coincidencias')
    }

    else {
        let gamesApi
        if (API == 1) {

            gamesApi = gamesApiResults.data?.results?.map(game => extractDataApi(game)) || []
        }
        if (API == 2) {

            gamesApi = gamesApiResults.data.map(game => extractDataApi(game)) || []
        }

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

    let gamesApiResults = []
    let gamesDb = []

    if (API == 1) {
        try {
            // gamesApiResults=await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
            gamesApiResults = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
            gamesApiResults_21_40 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
            gamesApiResults_41_60 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
            gamesApiResults_61_80 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
            gamesApiResults_81_100 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
            allGamesApiResults = gamesApiResults.data.results.concat(
                gamesApiResults_21_40.data.results,
                gamesApiResults_41_60.data.results,
                gamesApiResults_61_80.data.results,
                gamesApiResults_81_100.data.results
            )
            gamesApiResults.data.results = allGamesApiResults
            // console.log(allGamesApiResults)
        }
        catch (err) {
            console.log('api', err)
        }
    }

    if (API == 2) {
        try {
            console.log('entre')
            gamesApiResults = await axios.get('https://www.freetogame.com/api/games')
            console.log(gamesApiResults)
        }
        catch (err) {
            console.log('api', err)
        }
    }
    try {
        gamesDb = await Videogame.findAll({
            include: include
        });
    }

    catch (err) {
        console.log('db', err)
    }

    return dbConcat(gamesApiResults, gamesDb)

}


async function searchForName(search) {

    let gamesApiResults = []
    let gamesDb = []
    if (API == 1) {
        try {
            gamesApiResults = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${search}`)
        }
        catch (err) {
            console.log('api', err)
        }
    }

    if (API == 2) {
        try {
            const allGames = await axios.get('https://www.freetogame.com/api/games') || []
            gamesApiResults = allGames.filter(game => game.name == search)
        }
        catch (err) {
            console.log('api', err)
        }
    }

    try {
        gamesDb = await Videogame.findAll({
            where: {
                name: {
                    [Op.substring]: `${search}`
                }
            },
            include: include
        });
    }

    catch (err) {
        console.log('db', err)
    }

    return dbConcat(gamesApiResults, gamesDb, true)
}


async function searchById(search) {
    console.log(search, 'search')
    if (search * 1) {
        if (API == 1) {
            try {
                let gamesApiResults = await axios.get(`https://api.rawg.io/api/games/${search}?key=${API_KEY}`)
                const screenshotsApiResults = await axios.get(`https://api.rawg.io/api/games/${search}/screenshots?key=${API_KEY}`)
                gamesApiResults.data.short_screenshots = screenshotsApiResults.data.results
                return extractDataApi(gamesApiResults.data)
            }

            catch (err) {
                console.log('api', err)
            }
        }
        if (API == 2) {
            try {
                const gamesApiResults = await axios.get(`https://www.freetogame.com/api/game?id=${search}`)
                return extractDataApi(gamesApiResults)
            }

            catch (err) {
                console.log('api', err)
            }
        }
    }

    else {
        try {
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

        catch (err) {
            console.log('db', err)
        }


    }


}

async function addDbGame(data) {
    try {
        const { name, description, dateRelease, rating, platforms, genres, image, short_screenshots } = data   //genre es un array de ID de generos

        const game = await Videogame.create({ name, description, dateRelease, rating, platforms, image, short_screenshots });

        const gameGenre = genres.map(async (id) => {
            const genre = await Genre.findByPk(id)     //busco la el registro genero por ID,
            game.addGenre(genre)                             //le agrego ese registro por medio de la tabla intermedia.
        });

        const gamePlatform = platforms.map(async (id) => {
            const platform = await Platform.findByPk(id)     //busco la el registro genero por ID,
            game.addPlatform(platform)                             //le agrego ese registro por medio de la tabla intermedia.
        });

        const screenshots = short_screenshots.map(async (url) => {
             game.createShort_screenshot({image:url})                       
        });

        await Promise.all(gameGenre)
        await Promise.all(gamePlatform)
        await Promise.all(screenshots)

        return game
    }
    catch (err) {
        console.log('db', err)
    }
}

async function deleteGame(id) {
    const gameDeleted = await Videogame.destroy({
        where: {
            id: id
        },
    })
    return gameDeleted
}



module.exports = {
    searchForName,
    getGames,
    searchById,
    addDbGame,
    deleteGame
}



