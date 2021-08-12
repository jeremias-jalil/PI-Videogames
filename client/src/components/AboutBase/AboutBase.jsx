import React from 'react'
import style from './AboutBase.module.css'

export default function AboutBase({ content }) {

    const title = content.title
    const logo = content.logo
    const description = content.description
    const aplication = content.aplication
    const link = content.link

    function summary() {
        return { __html: description };
    }

    return (
        <div className={style.contenedor}>
            <div className={style.title}>
            </div>
            <div className={style.image}>
                <img src={logo} alt={logo}/>
            </div>
            <div className={style.content}>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={summary()} />
                <a href={link} target='_blank' rel="noreferrer">Oficial page</a>

                {aplication ?
                    <div>
                        <h3>Aplication in project</h3>
                        <p>{aplication}</p>
                    </div> :
                    <div></div>
                }
            </div>
        </div>

    )
}
