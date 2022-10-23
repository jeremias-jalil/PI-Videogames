require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const {
  DATABASE_URL,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_HOST_PORT,
  DB_DATABASE,
  DB_DIALECT,
} = process.env;

const sequelize = new Sequelize(
  DATABASE_URL ||
    `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_HOST_PORT}/${DB_DATABASE}`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Videogame, Genre, Platform, Short_screenshot, Apivideogame } =
  sequelize.models;

Apivideogame.belongsToMany(Genre, { through: "apivideogame_genre" });
Genre.belongsToMany(Apivideogame, { through: "apivideogame_genre" });

Apivideogame.belongsToMany(Platform, { through: "apivideogame_paltform" });
Platform.belongsToMany(Apivideogame, { through: "apivideogame_paltform" });

Apivideogame.hasMany(Short_screenshot);
Short_screenshot.belongsTo(Apivideogame);

Videogame.belongsToMany(Genre, { through: "videogame_genre" });
Genre.belongsToMany(Videogame, { through: "videogame_genre" });

Videogame.belongsToMany(Platform, { through: "videogame_paltform" });
Platform.belongsToMany(Videogame, { through: "videogame_paltform" });

Videogame.hasMany(Short_screenshot);
Short_screenshot.belongsTo(Videogame);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
