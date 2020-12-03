import React, { useState, useEffect } from 'react';
import {getHabitHistory} from 'api';
import HabitDays from './habitDays';

function HabitHistory() {
  const [habitHistory, setHabitHistory] = useState('');
  const [habitDays, setHabitDays] = useState([]);
  
  const style = {
    title : {
      height: '200px',
      width: '100%',
      textAlign:"center"
    },
    historyCard:{
      height: '80px',
      width: '515px',
      borderRadius: '20px',
      backgroundColor:'#157687',
      position:'fixed',
      left:'20%'
    },
    subhead : {
      textAlign:"center",
      color: "white" 
    }
  };

  const dayMap = {
    0 : 'Monday',
    1 : 'Tuesday',
    2 : 'Wednesday',
    3 : 'Thursday',
    4 : 'Friday',
    5 : 'Saturday',
    6 : 'Sunday'
  }

  useEffect(() => {
    const queryString = window.location.pathname.split("/");
      getHabitHistory(`/habits/${queryString[2]}`).then((res)=> {
          setHabitHistory(res[0]);
          setHabitDays(res[0].days);
      });
  }, []);

  function echoUsers(habits){
    const trueHabits = habits.reduce(
      (out, bool, index) => bool ? out.concat(index) : out, [])
    return (
      trueHabits.map((habit) => {
      return (<HabitDays
        days={dayMap.[habit]}
      >
      </HabitDays>
      )}
    ));
  };   

  return (
    <div>
    <h1 style={style.title}>{habitHistory.habit_name}</h1>
    <div style={style.historyCard}>
      <h2 style={style.subhead}>Days you selected to perform this habit:</h2>
      {echoUsers(habitDays)}
    </div>
    </div>
  )
};



export default HabitHistory;