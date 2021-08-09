export function filter(games, platform, genre, source) {
    
    const gameFiltred = games.filter((game) => (filterGenre(game.genres, genre) && filterPlatform(game.platforms, platform) && filterSource(game.id,source)))
    
    return gameFiltred

}

function filterGenre(genres, genre) {
    if (genre) {
        let include = false
        genres?.forEach((g) => {
            if (parseInt(g.id) === parseInt(genre)) {
             include = true
            }
        })
        return include 
    }
    else {
        return true
    }
}

function filterPlatform(platforms, platform) {
    if (platform) {
        let include = false
        platforms?.forEach((p) => {
            if(parseInt(p.id) === parseInt(platform)){
                include=true 
            }
        })
        return include
    }
    else {
        return true
    }
}

function filterSource(id,source){
    if(source === 1){
        if(typeof id === 'number'){
        return true
        }
        else return false
    }
    if(source === 2){
        if(typeof id === 'number'){
        return false
        }
        else return true
    }
    return true
}
