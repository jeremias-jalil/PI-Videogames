import React from 'react'

import style from './NoGameFound.module.css'

import noMatch from '../../no-matches.png'

export default function NoGameFound() {
    return (
        <div className={style.contenedor}>
            <div>
                <img src={noMatch} alt='No game found'/>
            </div>
        </div>
    )
}
