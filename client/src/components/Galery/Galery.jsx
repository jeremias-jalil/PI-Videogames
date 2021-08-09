import React from 'react'

import style from './Galery.module.css'

export default function Galery({ images }) {

    images = images?.slice(0, 6)

    return (
        <div className={style.contenedor}>
            {images?.map(image =>
                <img src={image.image} alt={image.image}/>)}
        </div>
    )
}
