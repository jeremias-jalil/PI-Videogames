import React from 'react'
import Search from '../Search/Search'
import { Link } from 'react-router-dom'

import style from './SearchBar.module.css'



export default function SearchBar() {
    return (
        <div className={style.contenedor}>
            <Link exact to='/home'>
                <div>logo</div>
            </Link>
            <Link exact to='/newgame'>
                <div>U-VGame</div>
            </Link>
            <div>
                <Search />
            </div>
        </div>
    )
}
