import React from 'react'
import { prettyDate } from "../../../helpers/formatters";

const ItineraryItemDates = ({ startDate, endDate }) => {
  if (!startDate && !endDate) return null

  return (
    <p className="ItineraryItemDates">
      { startDate == endDate ? prettyDate(startDate) : `${prettyDate(startDate) } - ${prettyDate(endDate)}` }
    </p>
  )
}


export default ItineraryItemDates