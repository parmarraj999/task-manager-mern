import React, { useContext, useState } from 'react'
import './auth.css'
import axios from 'axios';
import { UserData } from '../../context/context';

function Login({setShowForm}) {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const userData = useContext(UserData);

  const handleEmail = (e)=>{
    setEmail(e.target.value);
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value);
  }

  const handleLogin = ()=>{
    axios.post("http://localhost:4000/login",{
      email:email,
      password:password
    })
    .then(result=> {
      console.log(result.data)
      userData.setUserData(result.data)
      if(result.data === "successfull"){
        setShowForm(false)
      }
    })
    .catch(err => console.log(err))
  }

  // useState(async()=>{
  //   const response = await fetch("http://localhost:4000/login")
  //   const data = await response.json();
  //   console.log(data)
    
  // })
  
  const handleCancel = ()=>{
    setShowForm(false)
  }

  

  return (
    <div className='form-container' >
      <h2 className='form-title'>Log In</h2>
      <div className='input-container'>
        <h4>Email</h4>
        <input type='text' placeholder='' onChange={handleEmail}/>
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