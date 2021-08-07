import React from 'react';

import style from './App.module.css';

import { Route } from 'react-router-dom';

import Home from './pages/Home/Home'
import NewGame from './pages/NewGame/NewGame';
import Game from './pages/Game/Game';
import Landing from './pages/Landing/Landing';

function App() {
  return (
    <>
      <Route exact path='/'  component={Landing} />
      
      <Route path='/home'  component={Home} />

      <Route path='/newgame' component={NewGame}/>

      <Route path='/game/:id' component={Game}/>
        
    </>
  );
}

export default App;
