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

export async function getGameByNameApi(name){
    console.log(name)
    const games = await axios.get(`${BACK_SERVER}/videogames/?name=${name}`)
    return games.data
} 

export async function getGameByIdApi(id){
    const games = await axios.get(`${BACK_SERVER}/videogames/${id}`)
    return games.data
} 

export async function getAllGenreApi(){
    const games = await axios.get(`${BACK_SERVER}/genres`)
    return games.data
} 

export async function getAllPlatformApi(){
    const games = await axios.get(`${BACK_SERVER}/platforms`)
    return games.data
} 

export async function newGame(data){
    const games = await axios.post(`${BACK_SERVER}/videogames`,data)
    return games
} 