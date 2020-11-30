import React, {useState, useEffect} from 'react';
import './styles.css';
import {getHabits} from 'api/index';
import HabitButton from './habitButton';
import dotenv from "dotenv";
import { Link } from 'react-router-dom';

function Sidebar() {
    const [habits, setHabit] = useState([]);
    
    useEffect(() => {
        getHabits().then((res)=>{
            setHabit(res)
        });
    }, []);

    function echoUsers(users){
        return users.map((user) => {
            return (
            <HabitButton
                key={user._id}
                username={user.habit_name} 
                children={user._id}
            >
            </HabitButton>
            )
        });   
    };
    console.log('SIDEBAR PROCESS ENV', process.env);

    return (
        <nav id="sidebarMenu" className="sidebar">
            <div className="sidebar-menu">
                <ul className="nav flex-column">
                    <li className="first-nav-item">
                       <h3>Habits</h3>
                    </li>
                    {echoUsers(habits)} 
                </ul>
                <div className="sidebar-logout">
                    <a className="nav-link-logout" href="http://localhost:3001/logout" aria-label="Log Out">
                    Log Out
                    </a>
                </div>
            </div>
        </nav>
    )
};



export default Sidebar;