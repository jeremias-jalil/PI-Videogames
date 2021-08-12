import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom';

import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import style from './FilterIcon.module.css'

import { setPage } from '../../redux/actions'

export default function FilterIcon({ title, list, iconConverter, filterAction, routeAction }) {
    const { loading, genreFilter, sourceFilter, platformFilter } = useSelector(state => state)

    const dispatch = useDispatch()
    const history = useHistory()

    const [ico, setIco] = useState([])
    const [select, setSelect] = useState(0)
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (!genreFilter && !sourceFilter && !platformFilter) {
            setSelect(0)
        }
    }, [genreFilter, sourceFilter, platformFilter])


    useEffect(() => {
        if (iconConverter) {
            setIco(iconConverter(list))
        }// eslint-disable-next-line
    }, [loading])

    function filterActionHandle(id) {
        if (filterAction) {
            dispatch(filterAction(id))
            setSelect(id)
            dispatch(setPage(1))
        }
        if (routeAction) {
            history.push(`${routeAction}/${id}`)
        }
    }


    function resetFiltersAction() {
        if (filterAction) {
            dispatch(filterAction(null))
            setSelect(0)
            dispatch(setPage(1))
        }


    }

    return (
        <div>
            <div className={style.title}>
                <h3>{title}</h3>
                {active ? <FontAwesomeIcon icon={faMinus} key='plus' onClick={() => setActive(!active)} /> : <FontAwesomeIcon icon={faPlus} key='minus' onClick={() => setActive(!active)} />}
            </div>
            <div className={active?"":style.null}>
                {filterAction ?
                    <div>
                        <em className={style.icon} onClick={() => resetFiltersAction()}> -- All -- </em>
                    </div>
                    :
                    <div></div>
                }
                <div className={style.listIcon}>
                    {ico?.map(p => (
                        <div key={p.id} onClick={() => filterActionHandle(p.id)} className={parseInt(p.id) === parseInt(select) ? style.iconSelected : style.icon}>
                            <FontAwesomeIcon icon={p.icon} key={p.id} />
                            <em> {p.name}</em>
                        </div>)
                    )
                    }
                </div>
            </div>
        </div>
    )
}
