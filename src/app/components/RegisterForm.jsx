'use client'

import { registerAction } from '@/app/serverActions/registerAction'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RegistrationForm = () => {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState('')
    const router = useRouter()

    const registrationHandler = async(e) => {
        e.preventDefault()
        const userDetails = {username,email,password}
        console.log("userDetails:",userDetails)
        try {
            const response = await registerAction(userDetails)
            if(response.success){
                alert("User Registered successfully")
                setUsername(''),
                setEmail(''),
                setPassword('')
            router.push("/login")
            }
        } catch (error) {
            console.log(error)
        }   
       
    }
  return (
    <div className='formContainer'>
        <form onSubmit={registrationHandler} className='formSection'>
            <h2>Registration Form</h2>
            <br/><br/>
            <h3>Username</h3>
            <input type='text' name="username" placeholder='Username...' onChange={(e)=>setUsername(e.target.value)}/>
            <h3>Email</h3>
            <input type='text' name="email" placeholder='Email...' onChange={(e)=>setEmail(e.target.value)}/>
            <h3>Password</h3>
            <input type='text' name="password" placeholder='Password...' onChange={(e)=>setPassword(e.target.value)}/>
            <br/><br/>
            <button type='submit'>Register</button>
            <br/><br/>
            <Link href="/login" style={{color:"white"}}>
                Already Registered? Login
            </Link>
        </form>
    </div>
  )
}

export default RegistrationForm