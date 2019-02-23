import { connect } from 'react-redux';
import SignUp from './signUp';
import { signUp } from '../../actions/user_actions';

const mapStateToProps = (store) => {
  return {/*TODO: errors at some point*/};
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user) => dispatch(signUp(user))
  };
};

export default connect(null, mapDispatchToProps)(SignUp);