import React, {useEffect, useState} from "react";
import {TrackerContext} from './App';
import { getCompletions, getTracker } from "api";
import moment from "moment";


function ContextProvider({children}) {

  const [todoList, setTodoList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    const currMonth = moment().format("M")
    getTracker().then((res) => {
      const filteredToDo = res.filter(habit => !habit.done);
      setTodoList(filteredToDo);

      getCompletions().then((res2) => {
        const completedDates = res2[0].dates.filter(date => date.month === currMonth);
        const completedDays = completedDates[0].days;
        setCompletedList(completedDays);
      });
    });
  }, []);

  return (
    <TrackerContext.Provider value={{tracker: todoList, completedDays: completedList}}>
     {children}
    </TrackerContext.Provider>
  );
}

export default ContextProvider;