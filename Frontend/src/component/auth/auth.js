import React, { useState } from 'react'
import './auth.css'
import Login from './login'
import Signup from './signup'

function Auth({setShowForm}) {

  const [form,setForm] = useState("login")

  return (
    <div className='auth-container' >   
      <div className='auth-card' >
        <div className='auth-inputs' >
          {
            form === "login" ? <Login setShowForm={setShowForm}/> : <Signup setShowForm={setShowForm}/>
          }
          {
            form === "login" ? <h1>Don't Have Account ? <span onClick={()=>setForm("signup")}>Sign Up</span></h1> : <h1>Already Have Account ? <span onClick={()=>setForm("login")}>Log In</span></h1>
          }
        </div>
        <div className='auth-img' >
          <img src='../../image/form-img.jpg' />
        </div>
      </div>
    </div>
  )
}

export default Auth