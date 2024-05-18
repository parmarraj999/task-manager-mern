import React, { useContext, useEffect, useState } from 'react'
import './taskContainer.css'
import AddTask from '../addTask/addTask'
import { ShowAdd, UserID } from '../../context/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Edit from '../editTask/edit'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function TaskContainer() {

  useGSAP(()=>{
    gsap.from(".task",{
      opacity:0,
      duration:.7,
      stagger:1
    })
  })

  const addForm = useContext(ShowAdd)

  const [data, setData] = useState([]);

  const userID = useContext(UserID);
  const uid = userID.userID;

  const [count,setCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:4000/get/" + uid)
      .then((result) => {
        setData(result.data)
        // console.log(result.data)
      })
      .catch(error => console.log(error))
  },[data])   

  const handleDelete = (id) => {
    axios.delete("http://localhost:4000/delete/" + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      setCount((c)=>c+1)
  }

  const handleDone = (id) => {
    axios.put("http://localhost:4000/done/" + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
  const handleNotDone = (id) => {
    axios.put("http://localhost:4000/notdone/" + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const [showEdit, setShowEdit] = useState(false)
  const [currentTask, setCurrentTask] = useState();
  const [currTaskDetail, setCurrTaskDetail] = useState({
    date: "",
    time: ""
  })
  const [editId, setEditId] = useState();

  const handleEdit = (id, task, time, date) => {
    setShowEdit(true)
    setCurrentTask(task)
    setCurrTaskDetail({
      date: date,
      time: time
    })
    setEditId(id)
  }

 

  return (
    <div>

      {
        uid ? 
      <div className='task-container' >
        {
          addForm.showAdd ? <AddTask /> : ""
        }
        {
          showEdit ? <Edit
            id={editId}
            date={currTaskDetail.date}
            time={currTaskDetail.time}
            currentTask={currentTask}
            setShowEdit={setShowEdit}
          /> : ""
        }
        {data.map((data, key) => {
          return (
            <div key={key} className='task' >
              <div className='task-header'>
                <div className='task-icon' onClick={() => handleEdit(data._id, data.task, data.time, data.date)}>
                  <FontAwesomeIcon icon={faPen} />
                </div>
                {
                  data.done ?
                    <div className='tick-done-true' onClick={() => handleNotDone(data._id)}>
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                    :
                    <div className="tick-done" onClick={() => handleDone(data._id)}>
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                }
                <div className='delete-task ' onClick={() => handleDelete(data._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
                <div className='task-time'>{data.time}</div>
              </div>
              <div className='task-content' >
                <p style={data.done ? { color: "grey", textDecoration: "line-through" } : {}}>{data.task}</p>
              </div>
              <div className='date' >
                <h4>{data.day}</h4>
                <h4>{data.date}</h4>
              </div>
            </div>
          )
        })}
      </div>
       : <div className="preUid">
          <h4>Login To See Your Task</h4>
       </div>
      }
    </div>
  )
}

export default TaskContainer