import React from 'react';
import "./styles.css";
import Sidebar from 'components/Sidebar';
import Navbar from 'components/Navbar';
import HabitHistory from 'components/HabitHistory';


function HabitsPage() {
  const style = {
    container: {
      height: '100%',
      width: '85%',
      margin: "10px",
      position: "absolute",
      left: '15%'
    }
  };
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={style.container}>
      <HabitHistory />
      </div>
    </div>
  );
}

export default HabitsPage;