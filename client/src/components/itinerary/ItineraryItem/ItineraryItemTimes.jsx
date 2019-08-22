import React from 'react'
import moment from "moment"

const ItineraryItemTimes = ({ startTime, endTime }) => {
  if (!startTime && !endTime) return null
  let seperator = ""
  if (startTime && endTime) seperator = " - "

  return (
    <p className="ItineraryItemTimes">
      { startTime && moment(startTime).format('H:MM A') }
      { seperator }
      { endTime && moment(endTime).format('H:MM A') }
    </p>
  )
}

export default ItineraryItemTimes