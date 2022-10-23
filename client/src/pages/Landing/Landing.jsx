import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import imgBack from '../../landing.jpg'
import logo from '../../logo.png'
import style from './Landing.module.css'

import { setPage } from '../../redux/actions';
import { getAllGame } from '../../redux/actions'

export default function Landing() {
    const history = useHistory()
    const dispatch = useDispatch()

    const { gamesBackUp } = useSelector(state => state)

    useEffect(() => {
        dispatch(getAllGame(gamesBackUp)) // eslint-disable-next-line
    }, []) 

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
