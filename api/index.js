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
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
const { Genre, Platform } = require('./src/db')
const { API_KEY } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  // precarga de los generos de los juegos
  const apiGenresResponse = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
  const apiGenres = apiGenresResponse.data.results
  const genres = apiGenres.map(e => { return { name: e.name } })
  Genre.bulkCreate(genres)

  const apiPlatformsResponse = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`)
  const apiPlatforms = apiPlatformsResponse.data.results
  const Platforms = apiPlatforms.map(e => { return { name: e.name } })
  Platform.bulkCreate(Platforms)


  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
