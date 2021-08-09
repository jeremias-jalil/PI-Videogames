import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './SelectAdd.module.css'

export default function SelectAdd({ name, setGameInfo, gameInfo, list, iconConverter }) {

    const [listItem, setListItem] = useState(list)
    const [ico, setIco] = useState([])
    const [optionSelect, setOptionSelect] = useState(1)

    let listAdd = gameInfo[name]

    useEffect(() => {
        setListItem(list)
        setIco(iconConverter(listAdd))
        setOptionSelect(list[0]?.id)// eslint-disable-next-line
    }, [list])

    useEffect(() => {
        if (listItem[0]) {
            setOptionSelect(listItem[0].id)
        }
    }, [listItem])

    function add(e) {
        e.preventDefault()
        listAdd.push(parseInt(optionSelect))
        setGameInfo({ ...gameInfo, [name]: listAdd })
        setListItem(listItem.filter((prop) => prop.id !== parseInt(optionSelect)))
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
        <div className={style.contenedor}>
            <div className={style.input}>
                <select name={name} onChange={(e) => setOptionSelect(e.target.value)}>
                    {listItem.map(e => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </select>
                <button type='button' onClick={(e) => add(e)}>Add</button>
            </div>
            <div >
                {ico?.map((p, pos) => (
                    <div key={p.id} className={style.icon} onClick={() => deleteItem({ name }, pos)}>
                        <FontAwesomeIcon icon={p.icon} key={p.id} />
                        <em> {p.name}</em>
                    </div>
                ))
                }
            </div>
        </div>
    )
}
