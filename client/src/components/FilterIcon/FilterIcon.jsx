import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './FilterIcon.module.css'

import { filterByGenre, filterBySource, filterByPlatform, setPage } from '../../redux/actions'

export default function FilterIcon({ title, list, iconConverter, filter }) {
    const { loading, genreFilter, sourceFilter, platformFilter } = useSelector(state => state)

    const dispatch = useDispatch()

    const [ico, setIco] = useState([])
    const [select, setSelect] = useState(0)

    useEffect(() => {
        if (!genreFilter && !sourceFilter && !platformFilter) {
            setSelect(0)
        }
    }, [genreFilter,sourceFilter,platformFilter])


    useEffect(() => {
        if (iconConverter) {
            setIco(iconConverter(list))
        }// eslint-disable-next-line
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
        if (filter === "Genres") {
            dispatch(filterByGenre(id))
            setSelect(id)
        }
        dispatch(setPage(1))
    }


    function resetFiltersAction() {
        if (filter === "Platforms") {
            dispatch(filterByPlatform(null))

        }
        if (filter === "Source") {
            dispatch(filterBySource(null))

        }
        if (filter === "Genres") {
            dispatch(filterByGenre(null))

        }
        setSelect(0)
        dispatch(setPage(1))
    }


    return (
        <div>
            <div className={style.title}>
                <h3>{title}</h3>
            </div>
            <div>
                <em className={style.icon} onClick={() => resetFiltersAction()}> -- All -- </em>
            </div>
            <div className={style.listIcon}>
                {ico?.map(p => (
                    <div key={p.id} onClick={() => filterAction(p.id)} className={parseInt(p.id) === parseInt(select) ? style.iconSelected : style.icon}>
                        <FontAwesomeIcon icon={p.icon} key={p.id} />
                        <em> {p.name}</em>
                    </div>)
                )
                }
            </div>
        </div>
    )
}
