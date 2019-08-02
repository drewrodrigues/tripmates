import React from 'react'
import {connect} from 'react-redux'
import SignIn from './signIn'
import {signIn, clearSessionErrors} from '../../actions/sessionActions'

const mapStateToProps = state => ({
  errors: state.errors.sessionErrors
})

const mapDispatchToProps = dispatch => ({
  signIn: (user) => dispatch(signIn(user)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)