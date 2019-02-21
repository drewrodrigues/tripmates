import React from 'react';
import axios from 'axios';

// TODO: disable button until form is valid

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)

    this.state = { email: "", password: "" };

    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
  }

  update(attribute, e) {
    this.setState({[attribute]: e.currentTarget.value})
  }

  submit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    axios.post('/api/session', { user: { email, password }}
    ).then(res => {
      // TODO: store into store
      console.log(this.props.store);
      console.log(res.data);
      console.log(this.props);
    }).catch(err => {
      // TODO: show errors
      console.log(err);
    });
  }

  render() {
    const { email, password } = this.state;
    const { submit, update } = this;

    return (
      <>
        <h3>Sign In</h3>
        <form onSubmit={submit}>
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

          <input type="submit"></input>
        </form>
      </>
    );
  }
}

export default SignIn;