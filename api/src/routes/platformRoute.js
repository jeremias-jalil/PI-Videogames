const express = require("express");
const router = express.Router();
const { getPlatforms } = require("../controllers/platformControler");

router.get("/", async (req, res) => {
  try {
    const plataforms = await getPlatforms();
    res.json(plataforms);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
