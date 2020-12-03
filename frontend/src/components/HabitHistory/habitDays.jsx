import React from 'react';

function HabitDays(props) {
  const {days} = props;  
  const style = {
    fontSize:"30px"
  }
  const dayMap = {
    0 : 'Monday',
    1 : 'Tuesday',
    2 : 'Wednesday',
    3 : 'Thursday',
    4 : 'Friday',
    5 : 'Saturday',
    6 : 'Sunday'
  }

  return (
    <li className="nav-item" style={style}>
      {days}
    </li>
  );
}

export default HabitDays;