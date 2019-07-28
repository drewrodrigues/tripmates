import { connect } from 'react-redux'
import Nav from './Nav'
import { logout, signIn } from '../../actions/sessionActions'
import { withRouter } from 'react-router-dom'
import { currentUser } from '../../selectors/sessionSelectors'

const mapStateToProps = state => {
  return {
    currentUser: currentUser(state)
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  signIn: () => dispatch(signIn())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav))