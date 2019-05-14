import React from 'react'

const FormErrors = ({ errors }) => {
  return (
    <ul className="formErrors">
      { errors.map(error => (
        <li className="formError">{ error }</li>
      ) ) }
    </ul>
  )
}

export default FormErrors