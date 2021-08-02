const { Platform } = require('../db.js');

async function getPlatforms() {
    const platforms = await Platform.findAll()
    return platforms

}

module.exports = {
    getPlatforms
}