import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom';

import { getAllGame } from '../../redux/actions';
import { deleteGame } from '../../functions/api';

import getIconPlataforms from '../../functions/IcoRef/platformIcoRef';
import getIconGenre from '../../functions/IcoRef/genreIcoRef';
import starRating from '../../functions/IcoRef/starRating';

import style from './GameDetail.module.css'

import Galery from '../Galery/Galery';

export default function GameDetail({ id }) {

    const { game } = useSelector(state => state)

    const [icoGenre, setIcoGenre] = useState([])
    const [icoPlatform, setIcoPlatform] = useState([])
    const [starsIco, setStarIco] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        setIcoPlatform(getIconPlataforms(game.platforms))
        setIcoGenre(getIconGenre(game.genres))
        setStarIco(starRating(game.rating))

    }, [game])

    function gameDelete(e) {
        e.preventDefault()
        const opcion = window.confirm("do you want to delete the game? ");
        gameDeleteOk(opcion)
    }
    function gameDeleteOk(opcion) {
        if (opcion) {
            deleteGame(id)
            history.push('/home')
            dispatch(getAllGame([]))
        }
        else { }
    }


    function summary() {
        return { __html: game.description };
    }


    return (
        <div className={style.contenedor}>
            <div>
                <div className={style.title}>
                    <h1>{game.name}</h1>
                </div>
                <div className={style.data}>
                    <div className={style.iconsText}>
                        <h5>Release:</h5>
                        {game.dateRelease}
                    </div>
                    <div className={style.iconsText}>
                        <h5>Rating:</h5>
                        {starsIco?.map(p => (
                            <div className={style.ico}>
                                <FontAwesomeIcon icon={p} key={p} />

                            </div>)
                        )
                        }
                    </div>

                    <div className={style.iconsText}>
                        <h5>Genres:</h5>
                        {icoGenre?.map(p => (
                            <div className={style.ico}>
                                <FontAwesomeIcon icon={p?.icon} key={p?.id} />
                                <em>{p?.name}</em>
                            </div>)
                        )
                        }
                    </div>
                    <div className={style.iconsText}>
                        <h5>Platforms:</h5>
                        {icoPlatform?.map(p => (
                            <div className={style.ico}>
                                <FontAwesomeIcon icon={p?.icon} key={p?.id} />
                                <em> {p?.name}</em>
                            </div>)
                        )
                        }
                    </div>
                </div>
                <div className={style.description}>
                    <h5>Description:</h5>
                    <div dangerouslySetInnerHTML={summary()} />
                </div>
                <div>
                    {id * 1 ? "" : <button onClick={e => gameDelete(e)}>Delete game</button>}
                </div>
            </div>
            <div>
                <Galery images={game.short_screenshots} />
            </div>
        </div>
    )
}

