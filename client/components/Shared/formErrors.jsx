import React from 'react'

const FormErrors = ({ errors, show }) => {
  return (
    <ul className={ `formErrors formErrors-${ show }` }>
      { errors.map(error => (
        <li className={ `formError` }>{ error }</li>
      ) ) }
    </ul>
  )
}

export default FormErrors