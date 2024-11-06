"use server"

import { auth } from "../auth";
import DBConnection from "../utils/config/db";
import BookingModel from "../utils/config/models/Booking";
import UserModel from "../utils/config/models/User";

export async function bookingAction(bookingDetails){
    const session  = await auth()
    // console.log("Email Check:",session.email)
    await DBConnection()
    console.log("bookingDetails:",bookingDetails)
    const user = await UserModel.findOne({email:session.email})
    try {
        if(!user){
        return ({success:false,message:"user not found"})
    }
    const userId = user._id.toString()
    console.log("userId:",userId)

    const userBookingDetails = await BookingModel.create({
        startDate:bookingDetails.selectDates.startDate,
        endDate:bookingDetails.selectDates.endDate,
        price:bookingDetails.productRecord.price,
        productName:bookingDetails.productRecord.title,
        offer:bookingDetails.productRecord.offer,
        desc:bookingDetails.productRecord.desc,
        image:bookingDetails.productRecord.image,
    })
    await UserModel.findByIdAndUpdate(userId,{$push:{bookings:userBookingDetails._id}},{new:true})
    return({success:true})
    } catch (error) {
        console.log(error)
        return ({success:false,message:"Failed to create booking"})
    }
    
}