import { connect } from 'react-redux';
import Nav from './nav';
import { logout } from '../../actions/sessionActions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentUser: state.session.id
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav));