import React from 'react'

const ItineraryToggleFormButton = ({ toggleForm, formShown }) => (
  <button onClick={ toggleForm } className={`button ${formShown ? 'button-gray' : 'button-green'}`}>
    { formShown ? "Hide Form" : "Add Item" }
  </button>
)

export default ItineraryToggleFormButton