import React from 'react';
// import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from 'pages/Home';
import MainPage from 'pages/Main';
import HabitsPage from 'pages/Habits';
import { getTracker } from 'api';
import ContextProvider from './ContextProvider';


// import Button from 'react-bootstrap/Button';


function PrivateRoute ({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props => props.isLoggedIn === true
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/', 
          state: {from: props.location}
          }} /> }
    />
  )
}

function getTracks(){
  getTracker().then((res) => {
    console.log('res', res);
    const filteredToDo = res.filter(habit => !habit.done);
    const filteredCompleted = res.filter(habit => habit.done);
    
    return {
      filteredToDo,
      filteredCompleted,
    };
  });
};

let isLoggedIn = false;
export const TrackerContext = React.createContext({});

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/dashboard" component={HomePage} />
            <Route path="/habits/:habitID" component={HabitsPage} />
            {/* <PrivateRoute isLoggedIn={isLoggedIn} path='/dashboard' component={HomePage} /> */}
            {/* <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    </ContextProvider>
  );
}

export default App;
