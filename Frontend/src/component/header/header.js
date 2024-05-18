import React, { useContext } from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import { ShowAdd, UserData, UserID } from '../../context/context'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Header() {

  const addForm = useContext(ShowAdd)
  const userData = useContext(UserData);
  const userName = userData.userData?.name

  useGSAP(()=>{
    gsap.from(".header-title > h1",{
      y:-50,
      opacity:0,
      duration:.5,
      delay:1,
    })
    gsap.from(".header-title > p",{
      y:-30,
      opacity:0,
      duration:.5,
      delay:1.5,
    })
    gsap.from(".red-p",{
      opacity:0,
      duration:.5,
      delay:1.5,
    })
  })

  return (
    <div className='header-container' >
        <div className='header-title' >
            <h1>Good Morning <span>{userName}</span>,</h1>
            <p>Let's make this day productive</p>
        </div>
        {
          userData.userData.uid ?
          <button className='add-button' onClick={()=>{addForm.setShowAdd(true)}}> <FontAwesomeIcon icon={faPlus} /> Add Task</button>
          : <p className='red-p' style={{fontSize:"18px",fontWeight:"600",color:"tomato"}} >Please Log In First</p>
        }
    </div>
  )
}

export default Header