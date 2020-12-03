import React from "react";
import moment from "moment";
import CalendarYear from "./calendarYear";

export default function CalendarYearBody(props) {


  let year = [];
  let prevfive = moment()
	  .set("year", props.data)
	  .subtract(5, "year")
		.format("Y");
		
	let getDate = (startDate, stopDate) => {
		var dateArray = [];
		var currentDate = moment(startDate);
		console.log("currDate", currentDate);
		console.log("stopDate", stopDate);
		while (currentDate <= stopDate) {
			dateArray.push(moment(currentDate).format("YYYY"));
			currentDate = moment(currentDate).add(1, "year");
		}
		return dateArray;
	};

	let fiveyear = getDate(prevfive, moment(props.data));

	console.log("5year", fiveyear);

	fiveyear.map(data => {
	  year.push(
	    <CalendarYear data={data} onClick={props.onClick}/>
	  );
	});

	let rows = [];
	let cells = [];

	year.forEach((row, i) => {
	  if (i % 3 !== 0 || i === 0) {
	    cells.push(row);
	  } else {
	    rows.push(cells);
	    cells = [];
	    cells.push(row);
	  }
	});

	rows.push(cells);

	console.log("year,ss", year);
	console.log("rows,ss", rows);

	let yearlist = rows.map((d, i) => {
	  return <tr>{d}</tr>;
	});

	return (
	  <table className="calendar-month">
	    <thead>
	      <tr>
	        <th colSpan="4">Select a Year</th>
	      </tr>
	    </thead>
	    <tbody>{yearlist}</tbody>
	  </table>
	);
};