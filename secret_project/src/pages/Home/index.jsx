import React, {useState} from 'react';
import HobbyForm from 'components/HobbyForm';
import Sidebar from 'components/Sidebar';
import DragNDrop from 'components/DragNDrop';
import Navbar from 'components/Navbar';
import Calendar from 'components/Calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Streaks from 'components/Streaks';


function HomePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Navbar showModal={showModal} setShowModal={setShowModal}/>
      <div style={{width: "100%"}}>
      <Sidebar />
      <div style={{position:'relative', width: "85%", float:"right", padding:"20px", top:"81px"}}>
      {showModal ? <HobbyForm setShowModal={setShowModal}/> : null}
      <Calendar />
      <DragNDrop />
      <Streaks />
      </div>
      </div>
    </div>
  );
}

export default HomePage;
