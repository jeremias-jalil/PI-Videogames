import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './FilterIcon.module.css'

import { resetFilters, filterByGenre, filterBySource, filterByPlatform } from '../../redux/actions'

export default function FilterIcon({ title, list, iconConverter, filter }) {
    const platformFilter = useSelector(state => state.platform)
    const genreFilter = useSelector(state => state.genre)
    const sourceFilter = useSelector(state => state.source)
    const loading = useSelector(state => state.loading)

    const dispatch = useDispatch()

    const [ico, setIco] = useState([])
    const [select, setSelect] = useState(0)


    useEffect(() => {
        if (iconConverter) {
            setIco(iconConverter(list))
        }
    }, [loading])

    function filterAction(id) {
        if (filter === "Platforms") {
            dispatch(filterByPlatform(id))
            setSelect(id)
        }
        if (filter === "Source") {
            dispatch(filterBySource(id))
            setSelect(id)
        }
        if (filter === "Genre") {
            dispatch(filterByGenre(id))
            setSelect(id)
        }
    }


    function resetFiltersAction(){
        dispatch(resetFilters())
        setSelect(0)
    }


    return (
        <div>
            <div>
                <h3>{title}</h3>
            </div>
            <div>
                <a onClick={() => resetFiltersAction()}>All</a>
            </div>
            <div className={style.listIcon}>
                {ico?.map(p => (
                    <div onClick={() => filterAction(p.id)} className={p.id==select?style.iconSelected:style.icon}>
                        <FontAwesomeIcon icon={p.icon} key={p.id} />
                        <a> {p.name}</a>
                    </div>
                ))
                }
            </div>
        </div>
    )
}