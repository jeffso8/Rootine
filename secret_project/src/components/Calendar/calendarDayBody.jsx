import React, {useEffect, useState, useContext} from "react";
import {TrackerContext} from '../App/App';
import moment from "moment";
import CalendarDay from './calendarDay';


export default function CalendarDayBody(props) {
  const [completedList, setCompletedList] = useState([]);

  const daysInMonth = moment().daysInMonth();
  const currDay = parseInt(moment().format("D"));
  let weekdayshortname = [];
  let totalDays = [];
  const trackerData = useContext(TrackerContext);
 
  useEffect(() => {
    setCompletedList(trackerData.completedDays);

  }, [trackerData]);

  for (let d = 1; d <= daysInMonth; d++) {
    let currentDay = d === currDay ? "today" : "";
    totalDays.push(
      <CalendarDay key={d} day={d} completed={completedList} currDay={currentDay} onDayClick={props.onDayClick} isClickable/>
    );
    
    weekdayshortname.push(
      <CalendarDay key={d} day={d} currDay={currentDay} onDayClick={props.onDayClick}/>
    );
  }

  return(
    <table className="calendar-day">
      <thead>
        <tr>{weekdayshortname}</tr>
      </thead>
      <tbody>
      <tr>{totalDays}</tr>
      </tbody>
    </table>
  )
}
