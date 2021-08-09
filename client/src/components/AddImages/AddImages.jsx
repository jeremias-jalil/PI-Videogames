import React, { useState, useEffect } from 'react'
import style from './AddImages.module.css'

export default function AddImages({setGameInfo, gameInfo}) {

    const [listItem, setListItem] = useState([])
    const [item, setItem] = useState('')


    function addImage() {
        var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        if (RegExp.test(item)) {
            setListItem([...listItem, item])
            setItem('')
            
        } else {
            alert('Enter valid URL')
        }
    }

    useEffect(() => {
        setGameInfo({ ...gameInfo, short_screenshots: listItem })// eslint-disable-next-line
    }, [listItem])

    return (
        <div className={style.form}>
            <div className={style.input}>
                <input type="url" name='image' value={item} onChange={(e) => setItem(e.target.value)} />
                <button type='button' onClick={() => addImage()}>Add</button>
            </div>
            <div className={style.images}>
                {listItem.map(e => (
                    <img src={e} alt={e}/>
                ))}
            </div>
        </div>
    )
}
