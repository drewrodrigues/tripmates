import { connect } from 'react-redux'
import Nav from './nav'
import { logout } from '../../actions/sessionActions'
import { withRouter } from 'react-router-dom'
import { currentUser } from '../../selectors/sessionSelectors'

const mapStateToProps = state => {
  return {
    currentUser: currentUser(state)
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav))