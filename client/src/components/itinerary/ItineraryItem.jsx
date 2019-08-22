import React from 'react'
import ItineraryItemTitle from './ItineraryItem/ItineraryItemTitle'
import ItineraryItemDates from './ItineraryItem/ItineraryItemDates'
import ItineraryItemTimes from './ItineraryItem/ItineraryItemTimes'
import ItineraryItemDescription from "./ItineraryItem/ItineraryItemDescription"
import ItineraryItemPhoto from './ItineraryItem/ItineraryItemPhoto'
import ItineraryItemAttachment from './ItineraryItem/ItineraryItemAttachment'
import ItineraryItemPosition from './ItineraryItem/ItineraryItemPosition'

const ItineraryItem = ({ item: { id, startTime, endTime, startDate, endDate, description, title, position, photo, files }}) => {
  // debugger
  return (
    <div className="ItineraryItem">
      <ItineraryItemPosition position={position} />
      <ItineraryItemTimes startTime={startTime} endTime={endTime} />
      <ItineraryItemDates startDate={startDate} endDate={endDate} />
      {/* TODO: if cover photo, then pass title into cover Photo and don't render title */}
      <ItineraryItemTitle title={title} />
      <ItineraryItemPhoto photo={photo} />
      <ItineraryItemDescription description={description} />
      <ItineraryItemAttachment files={files} />
    </div>
  )
}

export default ItineraryItem