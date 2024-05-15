import React, { useContext, useState } from 'react'
import './auth.css'
import axios from 'axios';
import { UserData, UserID } from '../../context/context';
import { v4 as uuid } from 'uuid';

function Signup({ setShowForm ,setForm}) {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const userID = useContext(UserID);

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }

  const date = new Date();

  const handleSignup = () => {
    axios.post("http://localhost:4000/signup", {
      uid: uuid(),
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    })
    .then(()=>{
      console.log("sign in")
      userID.setUserID(uuid())
      setForm("login")
    })
    .then((err)=>{
      console.log(err)
    })
  }


  return (
    <div className='form-container' >
      <h2 className='form-title'>Create Account</h2>
      <div className='input-container'>
        <h4>Name</h4>
        <input type='text' placeholder='' onChange={handleName} />
      </div>
      <div className='input-container'>
        <h4>Email</h4>
        <input type='text' placeholder='' onChange={handleEmail} />
      </div>
      <div className='input-container'>
        <h4>Password</h4>
        <input type='Password' placeholder='' onChange={handlePassword} />
      </div>
      <div className='input-container'>
        <h4>Confirm Password</h4>
        <input type='Password' placeholder='' onChange={handleConfirmPassword} />
      </div>
      <div style={{ display: "flex", gap: "1.2rem" }}>
        <button className='login-btn' onClick={handleSignup} >Sign Up</button>
        <button className='cancel-btn' onClick={() => setShowForm(false)} >Cancel</button>
      </div>
    </div>
  )
}

export default Signup