import React, { useState } from 'react'
import style from './PageBase.module.css'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function PageBase({ title, topBar, leftBar, body }) {

    const [leftBarState, setLeftBarState] = useState(false)

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
                <div className={style.menuIco} onClick={() => setLeftBarState(!leftBarState)}><FontAwesomeIcon icon={faBars} /></div>
                <div className={leftBarState ? style.menuContentAct : style.menuContentDes}> {leftBar}</div>
                <div className={leftBarState? style.divScreen:style.none} onClick={() => setLeftBarState(false)}>a</div>
            </div>

        </div>
    )
}
