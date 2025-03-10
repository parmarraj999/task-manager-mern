import React, { useContext, useState } from 'react'
import './auth.css'
import axios from 'axios';
import { UserData, UserID } from '../../context/context';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Login({ setShowForm }) {

  useGSAP(()=>{
    gsap.from("input",{
      y:-50,
      opacity:0,
      stagger:.5
    })
    gsap.from(".input-container > h4",{
      opacity:0,
      stagger:.5
    })
    gsap.from(".login-btn",{
      x:-30,
      opacity:0,
      delay:1
    })
    gsap.from(".cancel-btn",{
      x:30,
      opacity:0,
      delay:1
    })
  })


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const userData = useContext(UserData);
  const userID = useContext(UserID);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = () => {
    axios.post("https://task-manager-mern-5lw5.onrender.com/login", {
      email: email,
      password: password
    })
      .then(result => {
        console.log(result.data)
        userData.setUserData(result.data)
        userID.setUserID(result.data.uid)
        setShowForm(false)
      })
      .catch(err => console.log(err))
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  return (
    <div className='form-container' >
      <h2 className='form-title'>Log In</h2>
      <div className='input-container'>
        <h4>Email</h4>
        <input type='text' placeholder='' onChange={handleEmail} />
      </div>
      <div className='input-container'>
        <h4>Password</h4>
        <input type='Password' placeholder='' onChange={handlePassword} />
      </div>
      <div style={{ display: "flex", gap: "1.2rem" }}>
        <button className='login-btn' onClick={handleLogin} >Log In</button>
        <button className='cancel-btn' onClick={handleCancel} >Cancel</button>
      </div>
    </div>
  )
}

export default Login