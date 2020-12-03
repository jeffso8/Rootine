import React, { useState, useEffect } from 'react';
import {getHabitHistory} from 'api';

function HabitHistory() {
  const [habitHistory, setHabitHistory] = useState('');
  

  const style = {
    textAlign:"center"
  };

  useEffect(() => {
    const queryString = window.location.pathname.split("/");
      getHabitHistory(`/habits/${queryString[2]}`).then((res)=> {
          setHabitHistory(res[0]);
      });
  }, []);

  return (
    <h1 style={style}>{habitHistory.habit_name}</h1>
  )
};



export default HabitHistory;