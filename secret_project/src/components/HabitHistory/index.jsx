import React, { useState, useEffect } from 'react';
import {getHabitHistory} from 'api';

function HabitHistory() {
  const [habitHistory, setHabitHistory] = useState('');
  
  const queryString = window.location.pathname.split("/");
  const id = queryString[3]

  const style = {
    textAlign:"center"
  }

  useEffect(() => {
      getHabitHistory(`habit/${id}`).then((res)=> {
          setHabitHistory(res[0])
      });
  }, []);

  return (
    <h1 style={style}>{habitHistory.habit_name}</h1>
  )
};



export default HabitHistory;