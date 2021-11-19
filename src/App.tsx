import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, HashRouter } from "react-router-dom";
import { Weather } from './views/WeatherBody/Weather';
import { createContext, useState } from "react";
import  {IContext} from './features/weather/type'
import {Login} from './views/Login/Login';
import ProtectedRoute from './features/weather/ProtectedRoute'
import { useAppSelector } from './Redux/hooks';

export const Context = createContext<Partial<IContext>>({});

function App() {
  const [isDark, toggleIsDark] = useState(false);
  const loggedIn = useAppSelector(state => state.login.loggedIn);
  const ctx = {
    toggleTheme: () => {
      toggleIsDark(!isDark);
    },
    theme: isDark ? `dark` : `light`,
  };
  return (
    <Context.Provider value={ctx}>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <ProtectedRoute path={`/:city/:id`} component={Weather} exact/>
          <ProtectedRoute path="/" component={Weather} exact/>
          <Route path="/login">
           {loggedIn? <Redirect to="/" />:<Login />} 
          </Route>
        </Switch>
      </HashRouter>
    </Context.Provider>
  );
}

export default App;
