import React, { useState } from 'react'
import './nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSearch, faSun } from '@fortawesome/fontawesome-free-solid'
import Auth from '../auth/auth'

function Nav() {

  const [theme, setTheme] = useState(false)
  const [isLogIn, setIsLogIn] = useState(false)
  const [showForm ,setShowForm] = useState(false)

  return (
    <div className='nav-container' >
      <div className='logo' >
        <img src='../../image/tm-logo.png' />
      </div>
      <div className='toggle-buttons' >
        <div style={theme ? { background: "rgb(255, 255, 255)" } : { background: "rgb(205, 205, 205)" }} className='button' onClick={() => setTheme(false)} >
          <FontAwesomeIcon icon={faMoon} />
        </div>
        <div style={theme ? { background: "rgb(205, 205, 205)" } : { background: "rgb(255, 255, 255)" }} className='button' onClick={() => setTheme(true)}>
          <FontAwesomeIcon icon={faSun} />
        </div>
      </div>
      <div className='profile-button' >
        <button className='button profile' >
          <img src='../image/profile.png' />
        </button>
        {
          isLogIn ?
            <button className='logout-btn' >Log Out</button> :
            <button className='login-btn' onClick={()=>setShowForm(true)} >Log In</button>
        }
      </div>
      {
        showForm ? <Auth setShowForm={setShowForm}/> : ""
      }
    </div>
  )
}

export default Nav