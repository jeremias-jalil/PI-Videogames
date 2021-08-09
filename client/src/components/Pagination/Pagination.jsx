import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import style from './Pagination.module.css'

import { setPage } from '../../redux/actions';

export default function Pagination({ totalGame, postPerPage }) {

    const { currentPage, loading } = useSelector(state => state)


    const dispatch = useDispatch()

    const [pageNumbers, setPageNumbers] = useState([])

    const totalPageNumbers = []

    const numberOfPages = Math.ceil(totalGame / postPerPage)
    for (let i = 1; i <= numberOfPages; i++) {
        totalPageNumbers.push(i)
    }
    useEffect(() => {
        if (currentPage === 1) {
            if (totalPageNumbers.length > 10) {
                setPageNumbers([...totalPageNumbers.slice(0, 10)])
            }
            else setPageNumbers(totalPageNumbers)
        }// eslint-disable-next-line
    }, [loading, totalPageNumbers.length, currentPage])

    function slicePageNumber(number) {
        if (totalPageNumbers.length > 10) {
            if (number <= 5) {
                setPageNumbers([...totalPageNumbers.slice(0, 10)])
            }
            if (number > numberOfPages - 5) {
                setPageNumbers([...totalPageNumbers.slice(numberOfPages - 10, numberOfPages)])
            }
            if (number > 5) {
                setPageNumbers([...totalPageNumbers.slice(number - 5, number + 5)])
            }
        }
    }

    function lastPage() {
        dispatch(setPage(numberOfPages))
        slicePageNumber(numberOfPages)
    }

    function firstPage() {
        dispatch(setPage(1))
        slicePageNumber(1)
    }



    return (
        <div className={style.contenedor}>

            <ul className={style.list}>
                <li className={currentPage > 5 && totalPageNumbers.length > 10 ? style.number : style.none} onClick={() => firstPage()}>
                    <h5>...</h5>
                </li>
                {pageNumbers.map(number =>
                    <li key={number} className={number === currentPage ? style.numberPage : style.number}>
                        <h5 onClick={() => {
                            dispatch(setPage(number))
                            slicePageNumber(number)
                        }}>{number}</h5>
                    </li>)}
                <li className={currentPage < numberOfPages - 5 && totalPageNumbers.length > 10 ? style.number : style.none} onClick={() => lastPage()}>
                    <h5>...</h5>
                </li>
            </ul>

        </div>
    )
}
