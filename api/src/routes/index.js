const { Router } = require("express");
const videogameRoute = require("./videogameRoute");
const platformRoute = require("./platformRoute");
const genreRoute = require("./genreRoute");
const router = Router();

router.use("/videogames", videogameRoute);
router.use("/platforms", platformRoute);
router.use("/genres", genreRoute);

module.exports = router;
