import React from 'react';
import { connect } from 'react-redux';
import SignIn from './signIn';
import { signIn } from '../../actions/sessionActions';

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(signIn(user))
});

export default connect(null, mapDispatchToProps)(SignIn);