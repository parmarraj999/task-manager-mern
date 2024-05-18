import React, { useState } from 'react'
import "./edit.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function Edit({setShowEdit,currentTask,time,date,id}) {
    
    const [newTask,setNewTask] = useState("");
    const [msg,setMsg] = useState();

    const handleEdit = (id)=>{
        if(newTask !== ""){
            axios.put('https://task-manager-mern-5lw5.onrender.com/edit/' + id,{
                newTask : newTask
            })
            .then((res)=>{
                console.log(res)
                setShowEdit(false)
            })
            .catch((err)=>console.log(err))
        }
        else{
            setMsg("Please Set New Task")
        }
    }

  return (
    <div className='edit-container' >
        <div className='edit-form' >
            <div className='edit-form-header' >
                <div className='edit-detail' >
                    <h5>{date}</h5>
                    <h5>{time}</h5>
                </div>
                <div className='close-icon' onClick={()=>setShowEdit(false)}>
                    <FontAwesomeIcon icon={faClose}/>
                </div>
            </div>
            <div>
                <h2 className='edit-current-task'>{currentTask}</h2>
            </div>
            <hr></hr>
            <p style={{fontSize:"14px",color:"black",fontWeight:"600"}} >Edit Task</p>
            <div className='edit-task' >
                <input type='text' placeholder='New task' onChange={(e)=>setNewTask(e.target.value)} />
                <button className='edit-btn' onClick={()=>handleEdit(id)}>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </div>
                <p style={{color:"red"}} >{msg}</p>
        </div>
    </div>
  )
}

export default Edit