import DBConnection from "@/app/utils/config/db";
import ProductModel from "@/app/utils/config/models/Product";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    await DBConnection()
    const {id} = await params;
    // console.log("ID:",id)
    try {
        if(!id){
            return NextResponse.json({success:false,message:"No product found"},{status:404})
        }
        const product = await ProductModel.findById(id)
        console.log("Product:",product)
        return NextResponse.json({success:true,data:product})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:"ID is not Found"})
    }
}