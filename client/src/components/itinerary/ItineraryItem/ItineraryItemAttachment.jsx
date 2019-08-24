import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ItineraryItemAttachment = ({ files }) => {
  if (!files) return null

  return (
    <div className="ItineraryItemAttachment-container">
      {files.map(file => (
        <a className="ItineraryItemAttachment" href={file.url} download>
          <FontAwesomeIcon icon="paperclip" />
          {file.name}
        </a>
      ))}
    </div>
  )
}

export default ItineraryItemAttachment