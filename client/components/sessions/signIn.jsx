import React from 'react'
import FormErrors from '../Shared/formErrors'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: "", password: "", showErrors: false }
    this.update = this.update.bind(this)
    this.submit = this.submit.bind(this)
  }

  update(attribute, e) {
    this.setState({
      [attribute]: e.currentTarget.value,
      showErrors: false
    })
  }

  submit(e) {
    e.preventDefault()
    const { email, password } = this.state
    this.props.login({email, password})
      .then(() => {
        this.props.history.push('/created_trips')
      })
      .fail(() => {
        this.setState({ showErrors: true })
      })
  }

  componentWillUnmount() {
    this.props.clearSessionErrors()
  }

  render() {
    const { email, password, showErrors } = this.state
    const { submit, update } = this
    const { errors } = this.props
    return (
      <>
        <h3>Sign In</h3>
        <FormErrors errors={ errors } show={ showErrors } />
        <form onSubmit={ submit }>
          <label>Email
            <input type="email"
              onChange={ (e) => update('email', e) }
              value={ email }
            />
          </label>

          <label>Password
            <input type="password"
              onChange={ (e) => update('password', e) }
              value={ password }
            />
          </label>

          <input type="submit" />
        </form>
      </>
    )
  }
}

export default SignIn