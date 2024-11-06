"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Circles } from 'react-loader-spinner'
import UserNavigation from '@/app/components/UserNavigation'
import Link from 'next/link'
import CalenderComponent from '@/app/components/CalenderComponent'

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { bookingAction } from '@/app/serverActions/bookingActions'

const DynamicProduct = () => {
    const [productRecord,setProduct] = useState()
    const[selectDates,setSelectDates] = useState(null)
    const params = useParams()
    const {id} = params;
    // console.log("DynamicId:",id)
    const router = useRouter()
    const dynamicProductHandler = async()=> {
        const response = await fetch(`http://localhost:3004/api/admin/product/${id}`)
        const productData = await response.json()
        // console.log("ProductData:",productData)
        setProduct(productData.data)
    }
    useEffect(() => {
        dynamicProductHandler()
    },[])

    const bookingHandler = async()=>{
      if(!selectDates){
        alert("Please select booking dates")
        return
      }
        // console.log(productRecord)
        const bookingDetails = {productRecord,selectDates}
        try {
          const result = await bookingAction(bookingDetails)
          if(result.success){
            alert("Booking Successful")
            router.push("/")
          }
        } catch (error) {
          console.log(error)
        }
    }

    const handleSelectDates = (dates) => {
      setSelectDates(dates)
      console.log("selectDates Coming From:",dates)
    }
  return (
    <div>
        {/* <CalenderComponent onDatesSelect={handleDateSelect}/>
        <Link href="/">
        <p align="center">Go Back</p>
        </Link> */}
        <UserNavigation/>
        <CalenderComponent onDateSelect={handleSelectDates}/>
        <Link href="/" style={{textAlign:'center',marginTop:"10px"}}>
            <p>Go Back</p>
        </Link>
      {productRecord? 
         (<div className="">
            <div className="singleSection">
            <div className="singleLeft">
              <div className="">
               <h2>{productRecord.title}</h2>
              </div>
              <img src={productRecord.image} alt={productRecord.title} className="singleImage"/>
              </div>
              <div className="singleCenter">
               <div className="singlePrice">Rs.{productRecord.price}</div>
               <p className="singleDesc">{productRecord.desc}</p>
               <div className="">
                   {productRecord.amen.map((eachAmen,i) => {
                        return(
                           <div className="singleAmen"  key={i}>
                              <span>*</span> {eachAmen}
                           </div>
                       )
                   })}
               </div>
               <div className="offer">
               <span>*</span>
                  <button>  Discount {productRecord.offer}</button>
               </div>
               <div className="singleBtn">
                   <button className="" onClick={bookingHandler}>Book Now</button>
               </div>
              </div>
            </div>

           </div>)
        :<h1 style={{position:'absolute', top:'50%', left:'50%'}}> 
    <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
        </h1>
    }
    </div>
  )
}

export default DynamicProduct