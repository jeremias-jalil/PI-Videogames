import React from 'react';

import style from './App.module.css';

import { Route } from 'react-router-dom';

import Home from './pages/Home/Home'
import NewGame from './pages/NewGame/NewGame';

function App() {
  return (
    <>
      <Route path='/home' >
        <div className={style.div}>
          <Home />
        </div>
      </Route>

      <Route path='/newgame' >
        <div className={style.div}>
          <NewGame />
        </div>
      </Route>

    </>
  );
}

export default App;
