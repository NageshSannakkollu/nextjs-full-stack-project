'use server'

import DBConnection from "../utils/config/db"
import UserModel from "../utils/config/models/User"

export async function registerAction(userDetails) {
    await DBConnection()
    // console.log("userDetails:",userDetails)
    try {
        await UserModel.create({
            username:userDetails.username,
            email:userDetails.email,
            password:userDetails.password
        })
        return ({success:true})
    } catch (error) {
            console.log(error)
    }
    
}