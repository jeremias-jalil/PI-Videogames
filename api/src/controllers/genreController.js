const { Genre } = require('../db.js');

async function getGenres() {
    const genres = await Genre.findAll()
    return genres

}

module.exports = {
    getGenres
}