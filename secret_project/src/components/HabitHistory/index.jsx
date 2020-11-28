import React, { useState, useEffect } from 'react';
import {getHabitHistory} from 'api';

function HabitHistory() {
  const [habitHistory, setHabitHistory] = useState('');
  
  const queryString = window.location.pathname.split("/");
  const id = queryString[2];

  const style = {
    textAlign:"center"
  };

  useEffect(() => {
      getHabitHistory(`/habits/${id}`).then((res)=> {
          console.log(res[0]);
          setHabitHistory(res);
      });
  }, []);

  return (
    <h1 style={style}>{habitHistory.habit_name}</h1>
  )
};



export default HabitHistory;