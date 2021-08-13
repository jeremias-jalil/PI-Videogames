import React from 'react'
import { Route } from 'react-router-dom';
import AboutBase from '../AboutBase/AboutBase';

import { Postgresql, PgAdmin, Node, Sequelize, Express,Postman, Api, ReactData, ReactRouter, Redux, CSSModule, FontAwesome, GitHub, Heroku, Profile, Proyect, HenryAcademy } from './content';

export default function AboutContent() {
    return (
        <>
            <Route exact path='/about/Postgresql'>
                <AboutBase content={Postgresql}/>
            </Route>
            <Route exact path='/about/PgAdmin'>
                <AboutBase content={PgAdmin}/>
            </Route>
            <Route exact path='/about/Node'>
                <AboutBase content={Node}/>
            </Route>
            <Route exact path='/about/Sequelize'>
                <AboutBase content={Sequelize}/>
            </Route>
            <Route exact path='/about/Express'>
                <AboutBase content={Express}/>
            </Route>
            <Route exact path='/about/Postman'>
                <AboutBase content={Postman}/>
            </Route>
            <Route exact path='/about/Api'>
                <AboutBase content={Api}/>
            </Route>
            <Route exact path='/about/React'>
                <AboutBase content={ReactData}/>
            </Route>
            <Route exact path='/about/ReactRouter'>
                <AboutBase content={ReactRouter}/>
            </Route>
            <Route exact path='/about/Redux'>
                <AboutBase content={Redux}/>
            </Route>
            <Route exact path='/about/CSSModule'>
                <AboutBase content={CSSModule}/>
            </Route>
            <Route exact path='/about/FontAwesome'>
                <AboutBase content={FontAwesome}/>
            </Route>
            <Route exact path='/about/GitHub'>
                <AboutBase content={GitHub}/>
            </Route>
            <Route exact path='/about/Heroku'>
                <AboutBase content={Heroku}/>
            </Route>
            <Route exact path='/about/Profile'>
                <AboutBase content={Profile}/>
            </Route>
            <Route exact path='/about/Proyect'>
                <AboutBase content={Proyect}/>
            </Route>
            <Route exact path='/about/HenryAcademy'>
                <AboutBase content={HenryAcademy}/>
            </Route>
        </>
    )
}
