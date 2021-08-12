import React, { useState } from 'react'

import style from './Galery.module.css'

export default function Galery({ images }) {

    const [currentImage, setCurrentImage] = useState('')
    
    images = images?.slice(0, 6)

    return (

        <div className={style.contenedor}>
            <img src={currentImage} alt={currentImage} className={style.currentImage} />
            {images?.map(image =>
                <img onClick={()=>setCurrentImage(image.image)}  src={image.image} alt={image.image} />)}
        </div>

    )
}
