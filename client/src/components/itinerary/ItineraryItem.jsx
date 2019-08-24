import React from 'react'
import ItineraryItemTitle from './ItineraryItem/ItineraryItemTitle'
import ItineraryItemDates from './ItineraryItem/ItineraryItemDates'
import ItineraryItemTimes from './ItineraryItem/ItineraryItemTimes'
import ItineraryItemDescription from "./ItineraryItem/ItineraryItemDescription"
import ItineraryItemPhoto from './ItineraryItem/ItineraryItemPhoto'
import ItineraryItemAttachment from './ItineraryItem/ItineraryItemAttachment'
import ItineraryItemPosition from './ItineraryItem/ItineraryItemPosition'
import ItineraryItemDeleteButton from './ItineraryItem/ItineraryItemDeleteButton'

const ItineraryItem = ({
  userCanManageItinerary,
  item: {
    id,
    startTime,
    endTime,
    startDate,
    endDate,
    description,
    title,
    position,
    photo,
    files
  }}) => {

  return (
    <div className="ItineraryItem">
      {userCanManageItinerary && <ItineraryItemDeleteButton id={id} />}
      <ItineraryItemPosition position={position} />
      <ItineraryItemTimes startTime={startTime} endTime={endTime} />
      <ItineraryItemDates startDate={startDate} endDate={endDate} />
      { photo ?
        <ItineraryItemPhoto photo={photo} title={title} />
        :
        (<>
          <ItineraryItemTitle title={title} />
          <ItineraryItemPhoto photo={photo} />
        </>)
      }
      <ItineraryItemDescription description={description} />
      <ItineraryItemAttachment files={files} />
    </div>
  )
}

export default ItineraryItem