import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './Card.module.css'

import getIconPlataforms from '../../functions/IcoRef/platformIcoRef'
import getIconGenre from '../../functions/IcoRef/genreIcoRef';
import starRating from '../../functions/IcoRef/starRating';

export default function Card({ game }) {
    const loading = useSelector(state => state.loading)
    const [focus, setFocus] = useState(true)
    const [platformIco, setPlatformIco] = useState([])
    const [genreIco, setGenreIco] = useState([])
    const [starsIco, setStarIco] = useState([])

    useEffect(() => {
        setPlatformIco(getIconPlataforms(game.platforms))
        setGenreIco(getIconGenre(game.genres))
        setStarIco(starRating(game.rating))
    }, [loading])

    function handleFocus() {
        setFocus(!focus)
    }

    return (
        <div className={style.contenedor} onMouseEnter={() => handleFocus()} onMouseLeave={() => handleFocus()}>
            <div on>
                <img src={game.image} className={style.imageCard} />
            </div>
            <div className={focus ? style.none : style.description}>
                <h1>{game.name}</h1>
                <div className={style.icons}>
                    <div>
                        {platformIco.map(p =>
                            <FontAwesomeIcon icon={p?.icon} />)}
                    </div>
                    <div>
                        {genreIco.map(p =>
                            <FontAwesomeIcon icon={p?.icon} />)}
                    </div>
                    <div>
                        {starsIco?.map(p =>
                            <FontAwesomeIcon icon={p} />)}
                    </div>
                </div>
                <h5 className={focus ? style.none : style.description}>{game.description}</h5>
            </div>
        </div >
    )
}
