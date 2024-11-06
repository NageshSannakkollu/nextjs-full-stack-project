import { DateRange } from 'react-date-range';
import React, { useState } from 'react'

const CalenderComponent = ({onDateSelect}) => {
    const [date,setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])
    const [showCalender,setShowCalender] = useState(false)
    const [selectedDates,setSelectedDates] = useState(null)

    const handleSelectionDates = async() => {
        const startDate = date[0].startDate.toLocaleDateString()
        const endDate  = date[0].endDate.toLocaleDateString()
        const bookingDates = {startDate,endDate}
        setSelectedDates(`Selected Dates: ${startDate} - ${endDate}`)
        setShowCalender(false)

        if(onDateSelect){
            onDateSelect(bookingDates)
        }
    }

    const currentDate = new Date().toDateString()
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate()+1)
    const formattedDate = nextDate.toDateString()

  return (
    <div className='calenderSection'>
        <div className='currentDate' onClick={()=> setShowCalender(!showCalender)}> 
            {!selectedDates && (
                <>
                    {`${currentDate} - ${formattedDate}`}
                </>
            )}
            {selectedDates && (
                <div style={{color:"red"}}>
                    {selectedDates}
                </div>
            )}
        </div>
    {showCalender && 
    <DateRange
        editableDateInputs={true}
        onChange={item => setDate([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={date}
        className='dateRange'
    />
    }
    <button type='button' onClick={handleSelectionDates} className='calenderButton'>Selected Dates</button>
    </div>
  )
}

export default CalenderComponent