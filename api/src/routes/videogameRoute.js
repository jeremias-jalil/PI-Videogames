const express = require('express');
const router = express.Router();
const { getGames, searchForName, searchById, addDbGame, deleteGame } = require('../controllers/videogameController')


router.get('/', async (req, res) => {
    try {
        const search = req.query.name

        if (search) {
            const games = await searchForName(search)
            res.json(games)
        }
        else {
            const games = await getGames()
            res.json(games)
        }

    }
    catch (err) {
        console.log(err)
        res.send(err)

    }
})

router.get('/:id', async (req, res) => {
    const search = req.params.id
    try {
        const games = await searchById(search)
        res.json(games)
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }

})

router.delete('/:id', async (req, res) => {
    const search = req.params.id
    try {
        const games = await deleteGame(search)
        res.json(games)
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }

})



router.post('/', async (req, res) => {
    const data = req.body
    try {
        const game = await addDbGame(data)
        res.json(game)
    }
    catch (err) {
        res.send(err)

    }
})

module.exports = router