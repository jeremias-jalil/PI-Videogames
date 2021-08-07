import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom';

import SelectAdd from '../SelectAdd/SelectAdd';
import { getAllGame } from '../../redux/actions';

import style from './NewGameForm.module.css'

import getIconGenre from '../../functions/IcoRef/genreIcoRef';
import getIconPlataforms from '../../functions/IcoRef/platformIcoRef';
import starRating from '../../functions/IcoRef/starRating';

import { newGame } from '../../functions/api';


export default function NewGameForm() {

    const { platforms, genres } = useSelector(state => state)
    const [icoGenre, setIcoGenre] = useState([])
    const [icoPlatform, setIcoPlatform] = useState([])
    const [starsIco, setStarIco] = useState([])
    const [button, setButton] = useState(true)

    const history = useHistory()
    const dispatch = useDispatch()

    const [gameInfo, setGameInfo] = useState({
        name: '',
        description: '',
        dateRelease: '',
        rating: 0,
        platforms: [],
        genres: [],
        image: '',
        short_screenshots:[]
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

    useEffect(() => {
        if (gameInfo.name &&
            gameInfo.description &&
            gameInfo.dateRelease &&
            gameInfo.rating &&
            gameInfo.platforms.length > 0 &&
            gameInfo.genres.length > 0 &&
            gameInfo.image
        ) {
            setButton(false)
        } else (
            setButton(true)
        )
    }, [gameInfo])

    function deleteItem(dataName, pos) {

        const newListItem = gameInfo[dataName]
        newListItem.splice(pos, 1)
        setGameInfo({ ...gameInfo, [dataName]: newListItem })
    }

    function saveGame() {
        newGame(gameInfo)
        history.push('/home')
        dispatch(getAllGame([]))
    }

    return (
        <div className={style.contenedor}>
            <form>
                <div className={style.form}>
                    <div className={style.formItem}>
                        <h5>Name*</h5>
                        <input placeholder="Game name" name='name' className={gameInfo.name ? style.input : style.inputNull} onChange={(e) => setData(e)} value={gameInfo.name} />
                    </div>

                    <div className={style.formItem}>
                        <h5>Release*</h5>
                        <input type='date' name='dateRelease' className={gameInfo.name ? style.input : style.inputNull} onChange={(e) => setData(e)} value={gameInfo.dateRelease} required />
                    </div>

                    <div className={style.formItem}>
                        <h5>Description*</h5>
                        <textarea placeholder="Game description" name='description' onChange={(e) => setData(e)} value={gameInfo.description} />
                    </div>

                    <div className={style.formItem}>
                        <h5>Rating*</h5>
                        <input type="range" name='rating' min="0" max="5" step="0.5" className={gameInfo.name ? style.input : style.inputNull} onChange={(e) => setData(e)} value={gameInfo.rating} required />
                        {starsIco?.map(p =>
                            <FontAwesomeIcon icon={p} />)}
                    </div>
                    <div className={style.formItem}>
                        <h5>Image*</h5>
                        <input type="url" name='image' className={gameInfo.name ? style.input : style.inputNull} onChange={(e) => setData(e)} value={gameInfo.image} required />
                    </div>
                </div>
            </form>
            <div className={style.selector}>
                <div>
                <h5>Platforms*</h5>
                    <SelectAdd name='platforms' setGameInfo={setGameInfo} gameInfo={gameInfo} list={platforms} iconConverter={getIconPlataforms}/>
                </div>
                <div>
                <h5>Genres*</h5>
                    <SelectAdd name='genres' setGameInfo={setGameInfo} gameInfo={gameInfo} list={genres} iconConverter={getIconGenre}/>
                </div>
            </div>
            <button type="button" className={button ? style.submitDis : style.submit} onClick={() => saveGame()} disabled={button} >Save new game</button>
        </div>
    )
}
