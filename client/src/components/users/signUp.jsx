import React from 'react'
import {Link} from 'react-router-dom'
import {handleImage } from '../../helpers/handlers'
import FormErrors from '../Shared/formErrors'

// TODO: disable button until form is valid

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      profile_picture: "",
      canSubmit: false
    }
    this.update = this.update.bind(this)
    this.submit = this.submit.bind(this)
    this.handleImage = handleImage.bind(this)
  }

  update(attribute, e) {
    this.setState({[attribute]: e.currentTarget.value})
  }

  submit(e) {
    e.preventDefault()

    // TODO: pull out into helper method
    const formData = new FormData()
    formData.append('user[first_name]', this.state.first_name)
    formData.append('user[last_name]', this.state.last_name)
    formData.append('user[email]', this.state.email)
    formData.append('user[password]', this.state.password)
    formData.append('user[profile_picture]', this.state.profile_picture)

    this.props.signUp(formData)
      .then(() => {
        this.props.history.push('/')
      })
  }

  componentWillUnmount() {
    this.props.clearUserErrors()
  }

  render() {
    const {first_name, last_name, email, password} = this.state,
          {handleImage, submit, update} = this,
          {errors} = this.props
    return (
      <div className="signUp">
        <header className="form-header signUp-header">
          <Link className="Nav-logo signUp-logo" to="/">tripmates</Link>
        </header>

        <form onSubmit={submit} className="form form-signUp">
          <header className="signUp-form-header">
            <img
              src={this.state.image_preview}
              className="signUp-avatar"
              data-cy="signUp-avatar-placeholder"
            />
            <h2 className="form-title">Sign Up</h2>
            <h4 className="form-subtitle">Let's get out there</h4>
          </header>

          <FormErrors errors={errors} />

          <label className="form-label">Profile picture</label>
          <input type="file"
            onChange={e => handleImage(e, 'profile_picture')}
            className="form-input"
            accept=".jpg,.jpeg,.png"
            data-cy="signUp-avatar"
          />

          <label className="form-label">First Name</label>
          <input type="text"
            onChange={(e) => update('first_name', e)}
            value={first_name}
            className="form-input half"
            data-cy="signUp-firstName"
          />

          <label className="form-label">Last Name</label>
          <input type="text"
            onChange={(e) => update('last_name', e)}
            value={last_name}
            className="form-input half"
            data-cy="signUp-lastName"
          />

          <label className="form-label">Email</label>
          <input type="email"
            onChange={(e) => update('email', e)}
            value={email}
            className="form-input"
            data-cy="signUp-email"
          />

          <label className="form-label">Password</label>
          <input type="password"
            onChange={(e) => update('password', e)}
            value={password}
            className="form-input"
            data-cy="signUp-password"
          />

          <footer className="form-footer signUp-footer">
            <div className="form-buttons">
              <input type="submit" className="button button-heavy button-green form-submit-primary" value="Create your account" />
            </div>
          </footer>
          <p className="signUp-alreadyHaveAccount">Already have an account? Try <Link to="/login" className="link">logging in</Link> instead.</p>
        </form>
      </div>
    )
  }
}

Object.assign(SignUp.prototype, handleImage)

export default SignUp