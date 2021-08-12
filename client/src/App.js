import React from 'react';

import { Route } from 'react-router-dom';

import Home from './pages/Home/Home'
import NewGame from './pages/NewGame/NewGame';
import Game from './pages/Game/Game';
import Landing from './pages/Landing/Landing';
import About from './pages/About/About';

function App() {
  return (
    <>
      <Route exact path='/'  component={Landing} />
      
      <Route path='/home'  component={Home} />

      <Route path='/newgame' component={NewGame}/>

      <Route path='/game/:id' component={Game}/>

      <Route path='/about' component={About}/>
        
    </>
  );
}

export default App;
