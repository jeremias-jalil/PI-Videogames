import React, { useState } from 'react'

import style from './Card.module.css'

export default function Card({ game }) {

    const [focus, setFocus] = useState(true)

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
                <h5 className={focus ? style.none : style.description}>{game.description}</h5>
            </div>
        </div>
    )
}
