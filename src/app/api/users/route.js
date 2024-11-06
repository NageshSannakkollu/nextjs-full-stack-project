import DBConnection from "@/app/utils/config/db";
import UserModel from "@/app/utils/config/models/User";
import { NextResponse } from "next/server";


export async function GET(){
    await DBConnection()
    try {
        const users = await UserModel.find({role:{$ne:'admin'}},{password:0})
        if(!users){
            return NextResponse.json({success:false,message:"User not found"},{status:404})
        }
        return NextResponse.json({users,success:true},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:"Failed to get users"},{status:500})
    }
}