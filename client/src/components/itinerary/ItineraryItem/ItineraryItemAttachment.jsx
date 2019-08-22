import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ItineraryItemAttachment = ({ attachment }) => {
  if (!attachment) return null

  return (
    <div className="ItineraryItemAttachment-container">
      <button className="ItineraryItemAttachment">
        <FontAwesomeIcon icon="paperclip" />
        {/*{attachment}*/}
        Camping Reservations
      </button>
      <button className="ItineraryItemAttachment">
        <FontAwesomeIcon icon="paperclip" />
        {/*{attachment}*/}
        Place Tickets
      </button>
    </div>
  )
}

export default ItineraryItemAttachment