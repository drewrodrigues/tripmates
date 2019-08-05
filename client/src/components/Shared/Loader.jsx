import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Loader = () => {
  return (
    <div className="Loader">
      <FontAwesomeIcon icon="spinner" spin className="Loader-spinner" />
      <p className="Loader-text">Loading</p>
    </div>
  )
}

export default Loader