const { Router } = require('express');
const videogameRoute = require('./videogameRoute')
const platformRoute = require('./platformRoute')
const genreRoute = require('./genreRoute')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogameRoute)
router.use('/platforms', platformRoute)
router.use('/genres', genreRoute)

module.exports = router;
