import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SelectAdd from '../SelectAdd/SelectAdd';

import getIconGenre from '../../functions/IcoRef/genreIcoRef';
import getIconPlataforms from '../../functions/IcoRef/platformIcoRef';
import starRating from '../../functions/IcoRef/starRating';

import { newGame } from '../../functions/api';


export default function NewGameForm() {

    const { platforms, genres } = useSelector(state => state)
    const [icoGenre, setIcoGenre] = useState([])
    const [icoPlatform, setIcoPlatform] = useState([])
    const [starsIco, setStarIco] = useState([])

    const [gameInfo, setGameInfo] = useState({
        name: '',
        description: '',
        dateRelease: '',
        rating: 0,
        platforms: [],
        genres: [],
        image: '',
    })

    function setData(e) {
        let dataName = e.target.name
        let dataValue = e.target.value
        setGameInfo({ ...gameInfo, [dataName]: dataValue })
    }

    useEffect(() =>
        setIcoPlatform(getIconPlataforms(gameInfo.platforms))
        , [gameInfo.platforms.length])

    useEffect(() =>
        setIcoGenre(getIconGenre(gameInfo.genres))
        , [gameInfo.genres.length])

    useEffect(() =>
        setStarIco(starRating(gameInfo.rating))
        , [gameInfo.rating])

    function deleteItem(dataName, pos) {

        const newListItem = gameInfo[dataName]
        newListItem.splice(pos, 1)
        setGameInfo({ ...gameInfo, [dataName]: newListItem })
    }

    function saveGame(){
        newGame(gameInfo)
    }

    return (
        <div>
            <form>
                Name:<input name='name' onChange={(e) => setData(e)} value={gameInfo.name} required/>
                Description:<textarea name='description' onChange={(e) => setData(e)} value={gameInfo.description} />
                Releace:<input type='date' name='dateRelease' onChange={(e) => setData(e)} value={gameInfo.dateRelease} required/>
                Rating:<input type="range" name='rating' min="0" max="5" step="0.5" onChange={(e) => setData(e)} value={gameInfo.rating} required/>
                <div>
                    {starsIco?.map(p =>
                        <FontAwesomeIcon icon={p} />)}
                </div>
                Image:<input type="url" name='image' onChange={(e) => setData(e)} value={gameInfo.image} required/>
            </form>
            <SelectAdd name='platforms' setGameInfo={setGameInfo} gameInfo={gameInfo} list={platforms} />
            {icoPlatform?.map((p, pos) => (
                <div onClick={() => deleteItem('platforms', pos)}>
                    <FontAwesomeIcon icon={p.icon} key={p.id} />
                </div>
            ))
            }
            <SelectAdd name='genres' setGameInfo={setGameInfo} gameInfo={gameInfo} list={genres} />
            {icoGenre?.map((p, pos) => (
                <div onClick={() => deleteItem('genres', pos)}>
                    <FontAwesomeIcon icon={p.icon} key={p.id} />
                </div>
            ))
            }
            <button onClick={()=>saveGame()}>Save new game</button>
        </div>
    )
}
