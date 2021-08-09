import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import imgBack from '../../landing.jpg'
import logo from '../../logo.png'
import style from './Landing.module.css'

import { setPage } from '../../redux/actions';

export default function Landing() {
    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <div style={{ backgroundImage: `url(${imgBack})` }} className={style.contenedor}>
            <div >
                <img src={logo} alt='logo' />
                <button onClick={(e) => {
                    e.preventDefault()
                    dispatch(setPage(1))
                    history.push('/home')
                }} className='buttonLanding'>Start</button>
            </div>
        </div>
    )
}
