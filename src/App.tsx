import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Weather } from './features/weather/WeatherBody/Weather';
import { createContext, useState } from "react";
import background from './features/weather/sky.jpg'
import background_night from './features/weather/night_sky.png'
import  {IContext} from './features/weather/type'



export const Context = createContext<Partial<IContext>>({});

function App() {
  const [isDark, toggleIsDark] = useState(false);
  const ctx = {
    toggleTheme: () => {
      toggleIsDark(!isDark);
    },
    theme: isDark ? `url(${background_night})` : `url(${background})`,
  };
  return (
    <Context.Provider value={ctx}>
    <div className="App" style= {{backgroundImage: ctx.theme, backgroundSize: 'cover'}}>
      <Router>
        <Switch>
          <Route path="/:id">
            <Weather />
          </Route>
          <Route path="/">
            <Weather />
          </Route>
        </Switch>
      </Router>
    </div>
    </Context.Provider>
  );
}

export default App;
