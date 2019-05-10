import React from 'react';
import { handleImage } from '../../helpers/handlers'

// TODO: disable button until form is valid

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      profile_picture: ""
    };
    this.update = this.update.bind(this)
    this.submit = this.submit.bind(this)
    this.handleImage = handleImage.bind(this)
  }

  update(attribute, e) {
    this.setState({[attribute]: e.currentTarget.value});
  }

  submit(e) {
    e.preventDefault();

    // TODO: pull out into helper method
    const formData = new FormData()
    formData.append('user[first_name]', this.state.first_name)
    formData.append('user[last_name]', this.state.last_name)
    formData.append('user[email]', this.state.email)
    formData.append('user[password]', this.state.password)
    formData.append('user[profile_picture]', this.state.profile_picture)

    this.props.signUp(formData).then(() => {
      this.props.history.push('/created_trips');
    });
  }

  render() {
    const { first_name, last_name, email, password } = this.state;
    const { handleImage, submit, update } = this;

    return (
      <>
        <h2>Sign Up</h2>
        <form onSubmit={submit}>
          <label>
            <input type="file"
              onChange={ e => handleImage(e, 'profile_picture') }
              className="form-control"
              accept=".jpg,.jpeg,.png"
            />
          </label>

          <label>First Name
            <input type="text"
              onChange={(e) => update('first_name', e)} 
              value={first_name}>
            </input>
          </label>

          <label>Last Name
            <input type="text"
              onChange={(e) => update('last_name', e)} 
              value={last_name}>
            </input>
          </label>

          <label>Email
            <input type="email"
              onChange={(e) => update('email', e)} 
              value={email}>
            </input>
          </label>

          <label>Password
            <input type="password"
              onChange={(e) => update('password', e)} 
              value={password}>
            </input>
          </label>

          <input type="submit" />
        </form>
      </>
    );
  }
}

Object.assign(SignUp.prototype, handleImage)

export default SignUp;