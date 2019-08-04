import React from 'react'

const TripCoverPhoto = ({coverPhoto, title}) => (
  <section className="TripCoverPhoto" style={{"backgroundImage": `url(${coverPhoto})`}}>
    <h3  className="TripCoverPhoto-title">{title}</h3>
  </section>
)

export default TripCoverPhoto
