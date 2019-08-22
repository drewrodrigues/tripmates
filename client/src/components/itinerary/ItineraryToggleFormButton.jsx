import React from 'react'

const ItineraryToggleFormButton = ({ toggleForm, formShown }) => (
  <button onClick={ toggleForm } className="button button-green button-heavy">
    { formShown ? "Hide Form" : "Add Item" }
  </button>
)

export default ItineraryToggleFormButton