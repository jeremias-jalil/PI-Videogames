
import axios from 'axios'

const BACK_SERVER =  'http://localhost:3001';

export async function getAllGameApi() {
    
    try {
        const games = await axios.get(`${BACK_SERVER}/videogames`)
        return games.data
    } catch (err) {
        throw err
    }

}

export async function getGameByNameApi(name) {
    try {
        const games = await axios.get(`${BACK_SERVER}/videogames/?name=${name}`)
        return games.data
    } catch (err) {
        throw err
    }

}

export async function getGameByIdApi(id) {
    
    try {
        const games = await axios.get(`${BACK_SERVER}/videogames/${id}`)
        
        return games.data
    } catch (err) {
        throw err
    }

}

export async function getAllGenreApi() {
    const games = await axios.get(`${BACK_SERVER}/genres`)
    return games.data
}

export async function getAllPlatformApi() {
    const games = await axios.get(`${BACK_SERVER}/platforms`)
    return games.data
}

export async function newGame(data) {
    const games = await axios.post(`${BACK_SERVER}/videogames`, data)
    return games
}

export async function deleteGame(id) {
    try {
        const games = await axios.delete(`${BACK_SERVER}/videogames/${id}`)
        
        return games.data
    } catch (err) {
        throw err
    }
}