import React from 'react'
import { useHistory } from 'react-router-dom';

import imgBack from '../../landing.jpg'
import logo from '../../logo.png'
import style from './Landing.module.css'

export default function Landing() {
    const history = useHistory()


    return (
        <div style={{ backgroundImage: `url(${imgBack})` }} className={style.contenedor}>
            <div >
                <img src={logo} />
                <button onClick={(e)=>(e.preventDefault(),history.push('/home') )}   className='buttonLanding'>Start</button>
            </div>
        </div>
    )
}
