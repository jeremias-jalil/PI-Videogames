import React from 'react'

import PageBase from '../PageBase/PageBase'
import NewGameForm from '../../components/NewGameForm/NewGameForm'
import SearchBar from '../../components/SearchBar/SearchBar'
import NavBar from '../../components/NavBar/NavBar'


export default function NewGame() {
    return (
        <PageBase title='All your games' topBar={<SearchBar />} leftBar={<NavBar />} body={<NewGameForm/>} />
    )
}
