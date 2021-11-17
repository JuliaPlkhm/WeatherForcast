import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
      <Router>
        <Switch>
          <ProtectedRoute path={`/:city/:id`} component={Weather} exact/>
            {/* <Weather />
          </ProtectedRoute> */}
          <ProtectedRoute path="/" component={Weather} exact/>
            {/* 
          </ProtectedRoute> */}
          <Route path="/login">
           {loggedIn? <Redirect to="/Минск/0" /> :<Login />} 
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
