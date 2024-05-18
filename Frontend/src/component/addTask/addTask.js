import React, { useContext, useState } from 'react'
import './addTask.css'
import { ShowAdd, UserData } from '../../context/context';
import axios from "axios"

function AddTask() {

    const date = new Date();
    const day = date.getDate()
    const month = date.getMonth()

    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = hour + " : " + minute;

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var dayName = days[d.getDay()];

    const addForm = useContext(ShowAdd)

    const [task,setTask] = useState();

    const handleTask = (e)=>{
        setTask(e.target.value);
    }

    const daysName = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Nov","Dec"]

    const userData = useContext(UserData)

    const handleAdd = ()=>{
        axios.post('https://task-manager-mern-5lw5.onrender.com/add',{
            userId : userData.userData.uid,
            task : task,
            day : dayName,
            time:time,
            date : `${day+ " , " + daysName[month]}`
        })
        addForm.setShowAdd(false)
    }
    // console.log(userId.userID)

    return (
        <div className='add-task-container' >
            <div className='task-card' >
                <div className='card-header' >
                    <h4>Today Task </h4>
                    <p>{dayName}, {day}/{month}</p>
                </div>
                <div className='card-inputs' >
                    <textarea placeholder='Task' onChange={handleTask} />
                </div>
                <div className='card-buttons' >
                    <button onClick={()=>addForm.setShowAdd(false)}>Cancel</button>
                    <button className='card-add-btn' onClick={handleAdd} >Add</button>
                </div>      
            </div>
        </div>
    )
}

export default AddTask