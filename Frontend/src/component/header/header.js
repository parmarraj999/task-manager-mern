import React, { useContext } from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import { ShowAdd, UserData, UserID } from '../../context/context'

function Header() {

  const addForm = useContext(ShowAdd)
  const userData = useContext(UserData);
  const userName = userData.userData?.name

  return (
    <div className='header-container' >
        <div className='header-title' >
            <h1>Good Morning <span>{userName}</span>,</h1>
            <p>Let's make this day productive</p>
        </div>
        {
          userData.userData.uid ?
          <button className='add-button' onClick={()=>{addForm.setShowAdd(true)}}> <FontAwesomeIcon icon={faPlus} /> Add Task</button>
          : <p style={{fontSize:"18px",fontWeight:"600",color:"tomato"}} >Please Log In First</p>
        }
    </div>
  )
}

export default Header