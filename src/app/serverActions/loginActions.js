"use server"
import { signIn } from "../auth"
import DBConnection from "../utils/config/db"

export async function loginActions(loginDetails){
    // console.log("loginDetails from form",loginDetails)
    await DBConnection()
    try {
        const response = await signIn("credentials",{
            email:loginDetails.email,
            password:loginDetails.password,
            redirect:false
        })
            if(!response || response.error){
                console.log("Login failed:",response?.error)
                throw new Error("login failed");
            }
                return ({success:true})
        
        }catch(error){
            throw new Error("Invalid credentials")
    }
}