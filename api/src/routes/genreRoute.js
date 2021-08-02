const express = require('express');
const router = express.Router();
const { getGenres } = require('../controllers/genreController')

router.get('/', async (req, res) => {
    try {
        const genres = await getGenres()
        res.json(genres)
    }
    catch (err) {
        console.log(err)
        res.send(err)

    }
})

module.exports = router