import React from 'react'

import PageBase from '../PageBase/PageBase'

import SearchBar from '../../components/SearchBar/SearchBar'
import NavBar from '../../components/NavBar/NavBar'
import AboutContent from '../../components/AboutContent/AboutContent'

export default function About() {
    return (
             <PageBase title='About the proyect' topBar={<SearchBar />} leftBar={<NavBar />} body={<AboutContent/>} />
    )
}
