import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './SelectAdd.module.css'

export default function SelectAdd({ name, setGameInfo, gameInfo, list, iconConverter }) {

    const [listItem, setListItem] = useState(list)
    const [ico, setIco] = useState([])

    let listAdd = gameInfo[name]

    useEffect(() => {
        setListItem(list)
        setIco(iconConverter(listAdd))
    }, [])

    function add(e) {
        e.preventDefault()
        listAdd.push(parseInt(e.target[0].value))
        setGameInfo({ ...gameInfo, [name]: listAdd })
        setListItem(listItem.filter((prop) => prop.id !== parseInt(e.target[0].value)))
        setIco(iconConverter(listAdd))
    }

    function deleteItem(dataName, pos) {
        const deleted = listAdd.splice(pos, 1)
        const propDeleted = list.filter((prop) => prop.id === parseInt(deleted))
        console.log(propDeleted)
        setListItem(listItem.concat(propDeleted))
        setGameInfo({ ...gameInfo, [dataName]: listAdd })
        setIco(iconConverter(listAdd))
    }

    return (
        <div>
            <form onSubmit={(e) => add(e)}>
                <select name={name}>
                    {listItem.map(e => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </select>
                <button type='submit'>Add</button>
                {ico?.map((p, pos) => (
                    <div className={style.icon} onClick={() => deleteItem({ name }, pos)}>
                        <FontAwesomeIcon icon={p.icon} key={p.id} />
                        <a> {p.name}</a>
                    </div>
                ))
                }
            </form>
        </div>
    )
}
