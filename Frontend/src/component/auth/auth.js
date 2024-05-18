import React, { useState } from 'react'
import './auth.css'
import Login from './login'
import Signup from './signup'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Auth({setShowForm}) {

  useGSAP(()=>{
    gsap.from(".acc-p",{
      y:-30,
      opacity:0,
      delay:1.5
    })
  })

  const [form,setForm] = useState("login")

  return (
    <div className='auth-container' >   
      <div className='auth-card' >
        <div className='auth-inputs' >
          {
            form === "login" ? <Login setForm={setForm} setShowForm={setShowForm}/> : <Signup setForm={setForm} setShowForm={setShowForm}/>
          }
          {
            form === "login" ? <h1 className='acc-p'>Don't Have Account ? <span onClick={()=>setForm("signup")}>Sign Up</span></h1> : <h1>Already Have Account ? <span onClick={()=>setForm("login")}>Log In</span></h1>
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