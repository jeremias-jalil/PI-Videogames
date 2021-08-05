export function orderAlphFunc(games, order) {
    let gameInOrder
    
    if (order === "ACS") {
        gameInOrder = [...
            games.sort((a, b) => {
                
                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0
            })]
        return gameInOrder
    }
    if (order === "DES") {
        gameInOrder = [...
            games.sort((a, b) => {
                
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0
            })]
        return gameInOrder
    }

    return games

}

export function orderRatingFunc(games, order) {
    let gameInOrder
    if (order === "ACS") {
        gameInOrder = [...games.sort((a, b) => {
            
            if (a.rating < b.rating) {
                return 1;
            }
            if (a.rating > b.rating) {
                return -1;
            }
            return 0
        })]
        return gameInOrder
    }
    if (order === "DES") {
        gameInOrder = [...games.sort((a, b) => {
            
            if (a.rating > b.rating) {
                return 1;
            }
            if (a.rating < b.rating) {
                return -1;
            }
            return 0
        })]
        return gameInOrder
    }
    return games
}