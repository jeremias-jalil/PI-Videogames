import env from "react-dotenv";
import axios from 'axios'

const BACK_SERVER = env.BACK_SERVER;

export async function getAllGameApi(){
    try{
    const games = await axios.get(`${BACK_SERVER}/videogames`)
    return games.data
    }catch(err){
        throw err
    }

} 

export async function getGameByName(name){
    const games = await axios.get(`${BACK_SERVER}/videogames/?${name}`)
    return games
} 

export async function getGameById(id){
    const games = await axios.get(`${BACK_SERVER}/videogames/${id}`)
    return games
} 

export async function getAllGenre(){
    const games = await axios.get(`${BACK_SERVER}/genres`)
    return games
} 

export async function getAllPlatform(){
    const games = await axios.get(`${BACK_SERVER}/platforms`)
    return games
} 

export async function newGame(data){
    const games = await axios.post(`${BACK_SERVER}/videogames`,data)
    return games
} 