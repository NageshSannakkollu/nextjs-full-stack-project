import DBConnection from "@/app/utils/config/db";
import UserModel from "@/app/utils/config/models/User";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    await DBConnection()
    const {id} = await params;
    // console.log("ID:",id)
     try {
        if(!id){
            return NextResponse.json({success:false,message:"No user found"},{status:404})
        }
        const user = await UserModel.findById(id).populate('bookings')
        return NextResponse.json({success:true,data:user},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:"ID is not Found"})
    }
}