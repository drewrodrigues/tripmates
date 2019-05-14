import { connect } from 'react-redux';
import SignUp from './signUp';
import { signUp, clearUserErrors } from '../../actions/userActions'

const mapStateToProps = state => ({
  errors: state.errors.userErrors
})

const mapDispatchToProps = dispatch => {
  return {
    signUp: user => dispatch(signUp(user)),
    clearUserErrors: () => dispatch(clearUserErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)