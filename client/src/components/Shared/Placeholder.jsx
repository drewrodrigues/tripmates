import React from "react"

const Placeholder = ({ children, image, title, text}) => (
  <div className="Placeholder">
    <img src={ image } className="Placeholder-image" />
    <h6 className="Placeholder-title">{ title }</h6>
    <p className="Placeholder-text">{ text }</p>

    { children && (
      <div className="Placeholder-children">
        { children }
      </div>
    )}
  </div>
)

export default Placeholder