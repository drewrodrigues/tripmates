import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

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
    this.props.login({email, password});
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