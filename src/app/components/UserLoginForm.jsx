"use client"

import React,{useState} from 'react'
import { loginActions } from '../serverActions/loginActions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginForm = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState('')
    const[error,setError] = useState("")
    const router = useRouter();

    const userLoginHandler = async(e) => {
        e.preventDefault()
        const loginDetails = {email,password}
        console.log("loginDetails:",loginDetails)
        try {
            const loginResponse = await loginActions(loginDetails)
            if(loginResponse.success){
                router.push("/")
            }else{
                setError(loginResponse.message || "login failed")
            }
        } catch (error) {
            setError(error.message)
        }   
    }
  return (
    <div className='formContainer'>
        <form onSubmit={userLoginHandler} className='formSection'>
            <h2>Login Form</h2>
            <br/>
            {error && <p style={{color:"red"}}>*{error}</p>}
            <br/>
            <h3>Email</h3>
            <input type='text' name="email" placeholder='Email...' onChange={(e)=>setEmail(e.target.value)}/>
            <h3>Password</h3>
            <input type='text' name="password" placeholder='Password...' onChange={(e)=>setPassword(e.target.value)}/>
            <br/><br/>
            <button type='submit'>Login</button>
            <br/><br/>
            <Link href="/register" style={{color:"white"}}>
                Not Registered? Signup
            </Link>
        </form>
    </div>
  )
}

export default LoginForm