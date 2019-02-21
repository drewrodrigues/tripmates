import React from 'react';
import { connect } from 'react-redux';
import SignIn from './SignIn';

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(null, {type: 'LOGIN'})
});

export default connect(null, mapDispatchToProps)(SignIn);