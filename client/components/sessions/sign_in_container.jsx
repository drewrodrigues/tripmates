import React from 'react';
import { connect } from 'react-redux';
import SignIn from './sign_in';
import { signIn } from '../../actions/session_actions';

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(signIn(user))
});

export default connect(null, mapDispatchToProps)(SignIn);