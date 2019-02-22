import React from 'react';

// TODO: disable button until form is valid

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { first_name: "", last_name: "", email: "", password: "" };

    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
  }

  update(attribute, e) {
    // TODO: better way to do this?
    this.setState({[attribute]: e.currentTarget.value});
  }

  submit(e) {
    e.preventDefault();
    const { first_name, last_name, email, password } = this.state;
    
    const that = this;
    this.props.signUp(this.state).then(() => {
      that.props.history.push('/created_trips');
    });
  }

  render() {
    const { first_name, last_name, email, password } = this.state;
    const { submit, update } = this;

    return (
      <>
        <h2>Sign Up</h2>
        <form onSubmit={submit}>
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

          <input type="submit"></input>
        </form>
      </>
    );
  }
}

export default SignUp;