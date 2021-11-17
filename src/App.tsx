import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Weather } from './views/WeatherBody/Weather';
import { createContext, useState } from "react";
import  {IContext} from './features/weather/type'


export const Context = createContext<Partial<IContext>>({});

function App() {
  const [isDark, toggleIsDark] = useState(false);
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
          <Route path={`/:city/:id`}>
            <Weather />
          </Route>
          <Route path="/">
            <Weather />
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
