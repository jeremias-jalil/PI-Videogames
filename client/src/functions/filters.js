export function filter(games, platform, genre, source) {
    
    const gameFiltred = games.filter((game) => (filterGenre(game.genre, genre) && filterPlatform(game.platforms, platform)))
    
    return gameFiltred

}

function filterGenre(genres, genre) {
    if (genre) {
        let include = false
        genres?.forEach((g) => {
            if (g.id == genre) {
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
            if(p.id == platform){
                include=true 
            }
        })
        return include
    }
    else {
        return true
    }
}

