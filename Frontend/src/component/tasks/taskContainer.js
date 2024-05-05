import React, { useContext, useEffect, useState } from 'react'
import './taskContainer.css'
import AddTask from '../addTask/addTask'
import { ShowAdd } from '../../context/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faCheck, faPen } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function TaskContainer() {

  const addForm = useContext(ShowAdd)

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/get")
      .then((result) => {
        setData(result.data)
        // console.log(result.data)
      })
      .catch(error => console.log(error))
  }, [data])

  const handleDelete = (id) => {
    axios.delete("http://localhost:4000/delete/" + id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
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

  return (
    <div className='task-container' >
      {
        addForm.showAdd ? <AddTask /> : ""
      }
      {data.map((data, key) => {
        return (
          <div key={key} className='task' >
            <div className='task-header'>
              <div className='task-icon'>
                <FontAwesomeIcon icon={faPen} />
              </div>
              {
                data.done ?
                  <div className='tick-done-true' onClick={() => handleNotDone(data._id)}>
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  :
                  <div className= "tick-done" onClick={() => handleDone(data._id)}>
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
              }
              <div className='delete-task ' onClick={() => handleDelete(data._id)}>
                <FontAwesomeIcon icon={faCancel} />
              </div>
              <div className='task-time'>{data.time}</div>
            </div>
            <div className='task-content' >
              <p style={data.done ? { color:"grey",textDecoration:"line-through"} : {}}>{data.task}</p>
            </div>
            <div className='date' >
              <h4>{data.day}</h4>
              <h4>{data.date}</h4>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TaskContainer