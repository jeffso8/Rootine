import React, {useEffect, useState, useContext} from "react";
import {TrackerContext} from '../App/App';
import moment from "moment";
import CalendarDay from './calendarDay';
import { getCompletions, getTracker } from "api";


export default function CalendarDayBody(props) {
  const [completedList, setCompletedList] = useState([]);

  const daysInMonth = moment().daysInMonth();
  const currMonth = moment().format("M")
  const currDay = parseInt(moment().format("D"));
  let weekdayshortname = [];
  let totalDays = [];
  const trackerData = useContext(TrackerContext);
  console.log('trackerData', trackerData);
  // useEffect(() => {
  //   getCompletions().then((res) => {
  //     const completedDates = res[0].dates.filter(date => date.month == currMonth);
  //     const completedDays = completedDates[0].days;
  //     setCompletedList(completedDays);
  //   });
  // }, trackerData);
  useEffect(() => {
    setCompletedList(trackerData.completedDays);

  }, [trackerData]);

  for (let d = 1; d <= daysInMonth; d++) {
    let currentDay = d === currDay ? "today" : "";
    totalDays.push(
      <CalendarDay day={d} completed={completedList} currDay={currentDay} onDayClick={props.onDayClick} isClickable/>
    );
    
    weekdayshortname.push(
      <CalendarDay day={d} currDay={currentDay} onDayClick={props.onDayClick}/>
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
