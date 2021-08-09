import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom';

import style from './Card.module.css'

import getIconPlataforms from '../../functions/IcoRef/platformIcoRef'
import getIconGenre from '../../functions/IcoRef/genreIcoRef';
import starRating from '../../functions/IcoRef/starRating';

export default function Card({ game }) {
    const loading = useSelector(state => state.loading)
    const [focus, setFocus] = useState(false)
    const [platformIco, setPlatformIco] = useState([])
    const [genreIco, setGenreIco] = useState([])
    const [starsIco, setStarIco] = useState([])
    const history = useHistory()

    useEffect(() => {
        setPlatformIco(getIconPlataforms(game.platforms))
        setGenreIco(getIconGenre(game.genres))
        setStarIco(starRating(game.rating))// eslint-disable-next-line
    }, [loading])

    return (
        <div className={style.contenedor} onMouseEnter={() => setFocus(true)} onMouseLeave={() => setFocus(false)} onClick={(e) => {
            e.preventDefault()
            history.push(`/game/${game.id}`)
        }}>
            <div>
                <img src={game.image} className={focus ? style.imageCardFocus : style.imageCard} alt={game.id}/>

            </div>
            <div className={focus ? style.description : style.none}>
                <h2>{game.name}</h2>
                <div className={style.icons}>
                    <div className={style.iconsText}>
                        <h5>Rating:  </h5>
                        {starsIco?.map((p,pos) =>
                            <FontAwesomeIcon icon={p} className={style.ico} key={pos}/>)}

                    </div>
                    <div className={style.iconsText}>
                        <h5>Platforms:  </h5>
                        {platformIco?.map(p => (
                            <div className={style.ico} key={p?.id}> 
                                <FontAwesomeIcon icon={p?.icon || ''} key={p?.id} />
                                <em>{p?.name}</em>
                            </div>)
                        )}
                    </div>
                    <div className={style.iconsText}>
                        <h5>Genres:  </h5>
                        {genreIco?.map(p => (
                            <div className={style.ico} key={p?.id}>
                                <FontAwesomeIcon icon={p?.icon} key={p?.id} />
                                <em>{p?.name}</em>
                            </div>))}
                    </div>
                </div>
            </div>
        </div >
    )
}
