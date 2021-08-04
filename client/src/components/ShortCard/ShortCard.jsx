import React from 'react'

import style from './ShortCard.module.css'

export default function ShortCard({game}) {
    
    return (
        <div className={style.contenedor}>
            <div>
                <img src={game.image} className={style.imageCard}/>
            </div>
            <div>
                <h1>{game.name}</h1>
            </div>
        </div>
    )
}
