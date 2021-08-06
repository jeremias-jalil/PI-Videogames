import React from 'react'
import Search from '../Search/Search'
import logo from '../../logo.png'
import { Link } from 'react-router-dom'

import style from './SearchBar.module.css'



export default function SearchBar() {
    return (
        <div className={style.contenedor}>
            <Link exact to='/home'>
                <div>
                    <img src={logo} style={{width:'50px'}}/>
                </div>
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
