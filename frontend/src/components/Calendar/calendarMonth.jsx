import React from "react";

export default function CalendarMonth(props) {

  return (
    <td
	    key={props.month}
	    className="calendar-month"
	    onClick={e => {props.onClick(props.month);}}
	  >
	  <span>{props.month}</span>
	  </td>
  
)};