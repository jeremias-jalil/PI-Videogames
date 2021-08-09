import React from 'react'
import Search from '../Search/Search'
import logo from '../../logo.png'
import { useHistory } from 'react-router-dom';

import style from './SearchBar.module.css'



export default function SearchBar() {
    const history = useHistory()
    return (
        <div className={style.contenedor}>
            <div className={style.logo}>
                <img src={logo} style={{ width: '70px' }} onClick={() => history.push('/') } alt='logo'/>
            </div>
            <div className={style.search}>
                <Search />
            </div>
        </div>
    )
}
