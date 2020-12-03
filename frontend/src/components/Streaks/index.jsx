import React, {useEffect, useState, useContext} from 'react';
import {TrackerContext} from '../App/App';

function Streaks() {
  const [completedList, setCompletedList] = useState([]);
  const trackerData = useContext(TrackerContext);
 
  useEffect(() => {
    setCompletedList(trackerData.completedDays);
  }, [trackerData]);
  
  let counter = 0;

  for (let i = 0; i < completedList.length; i++) {
    if (completedList[i] == (completedList[i+1] - 1)) {
      counter++;
    } else {
      counter = 1;
    }
  } 

  const streakStyle = {
    container:{
      width:"200px", 
      height: "150px",
      position: "absolute",
      bottom: '7%',
      right: '20%',
      backgroundColor: "#19889b",
      borderRadius: "10%"
    },
    heading:{
      color:"white",
      fontSize: "25px",
      textAlign: "center"
    },
    counter:{
      padding:"5px",
      color:"white",
      fontSize: "25px",
      textAlign: "center"
    }
  };

  return (
    <div className="habitStreak" style={streakStyle.container}>
      <h1 style={streakStyle.heading}>Your Longest Habit Streak is:</h1>
      <h2 style={streakStyle.counter}>{counter}</h2>
    </div>
  );
}

export default Streaks;