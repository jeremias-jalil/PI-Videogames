import React from 'react'
import style from './PageBase.module.css'
import { useSelector } from 'react-redux';

import { getGameById } from '../../redux/actions';

export default function PageBase({ title, topBar, leftBar, body }) {

    const { game } = useSelector(state => state)

    return (
        <div className={style.home} style={game.image ? { backgroundImage: `url(${game.image})` } : { backgroundColor: '#151515' }}>
            <div className={style.body}>
                <h1>{title}</h1>
                {body}
            </div>
            <div className={style.topBar}>
                {topBar}
            </div>
            <div className={style.leftBar}>
                {leftBar}
            </div>

        </div>
    )
}
