import React from 'react'
import style from './PageBase.module.css'

export default function PageBase({title,topBar,leftBar,body}) {
    return (
        <div className={style.home}>
            <div className={style.topBar}>
            {topBar}
            </div>
            <div className={style.leftBar}>
            {leftBar}
            </div>
            <div className={style.body}>
                <h1>{title}</h1>
                {body}
            </div>
        </div>
    )
}
