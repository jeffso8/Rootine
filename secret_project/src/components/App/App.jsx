import React from 'react';
// import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from 'pages/Home';
import MainPage from 'pages/Main';
import HabitsPage from 'pages/Habits';
import ContextProvider from './ContextProvider';


// import Button from 'react-bootstrap/Button';
export const TrackerContext = React.createContext({});

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/dashboard" component={HomePage} />
            <Route path="/habithistory/:habitID" component={HabitsPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </ContextProvider>
  );
}

export default App;
