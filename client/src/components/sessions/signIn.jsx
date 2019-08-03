import React from 'react'
import {Link} from 'react-router-dom'
import FormErrors from '../Shared/formErrors'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: "", password: ""}
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
    const {email, password} = this.state
    this.props.signIn({email, password})
  }

  componentWillUnmount() {
    this.props.clearSessionErrors()
  }

  render() {
    const {email, password} = this.state
    const {submit, update} = this
    const {errors} = this.props
    return (
      <div className="signUp">
        <header className="form-header signUp-header">
          <Link className="Nav-logo signUp-logo" to="/">tripmates</Link>
        </header>

        <form onSubmit={submit} className="form">
          <header className="form-header signUp-form-header">
            <h3 className="form-title">Sign In</h3>
            <h4 className="form-subtitle">Welcome back</h4>
          </header>

          <FormErrors errors={errors} />

          <label className="form-label">Email</label>
          <input type="email"
            onChange={(e) => update('email', e)}
            value={email}
            className="form-input"
            data-cy="signUp-email"
          />

          <label className="form-label">Password</label>
          <input type="password"
            onChange={ (e) => update('password', e)}
            value={password}
            className="form-input"
            data-cy="signUp-password"
          />

          <footer className="form-footer signUp-footer">
            <div className="form-buttons">
              <input type="submit" value="Sign in" className="button button-heavy button-green form-submit-primary" />
            </div>
          </footer>
          <p className="signUp-alreadyHaveAccount">Don't have an account? Try <Link to="/signup" className="link">signing up</Link> instead.</p>
        </form>
      </div>
    )
  }
}

export default SignIn