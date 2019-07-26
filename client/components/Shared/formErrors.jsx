import React from 'react'

const FormErrors = ({ errors }) => {
  if (errors.length === 0) return null

  return (
    <ul className="form-errors">
      { errors.map(error => (
        <li className="form-error" key={ error }>{ error }</li>
      ) ) }
    </ul>
  )
}

export default FormErrors