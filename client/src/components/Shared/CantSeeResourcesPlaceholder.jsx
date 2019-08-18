import React from 'react'
import Binoculars from '../../assets/binoculars.svg'

const CantSeeResourcesPlaceholder = ({ resourceName }) => (
  <div className="CantSeeResourcesPlaceholder">
    <img src={ Binoculars } />
    <h4>No Peeking</h4>
    <p>You must join this trip to see <span>{ resourceName }</span></p>
  </div>
)

export default CantSeeResourcesPlaceholder