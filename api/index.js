//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
const { Genre, Platform } = require('./src/db');
const e = require('express');
const { API_KEY, API } = process.env;


// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  // precarga de los generos de los juegos
  if (API == 1) {
    try {
      const apiGenresResponse = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      const apiGenres = apiGenresResponse.data.results
      const genres = apiGenres.map(e => { return { name: e.name } })
      Genre.bulkCreate(genres)

      const apiPlatformsResponse = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`)
      const apiPlatforms = apiPlatformsResponse.data.results
      const platforms = apiPlatforms.map(e => { return { name: e.name } })
      Platform.bulkCreate(platforms)
    }
    catch (err) {
      console.log(err)
    }
  }

  if (API == 2) {
    try {
      const apiGenresResponse = await axios.get(`https://www.freetogame.com/api/games`)  
      
      let apiGenres = {}
      let apiPlatforms = {}
      apiGenresResponse.data.forEach(e => { return (apiGenres[e.genre] = e.genre, apiPlatforms[e.platform] = e.platform) })
        
      const genresName = Object.keys(apiGenres)
      const platformsName = Object.keys(apiPlatforms)

      const genres = genresName.map(e => { return { name: e } })
      const platforms = platformsName.map(e => { return { name: e } })

      Genre.bulkCreate(genres)
      Platform.bulkCreate(platforms)
    }
    catch (err) {
      console.log(err)
    }


  }

  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
