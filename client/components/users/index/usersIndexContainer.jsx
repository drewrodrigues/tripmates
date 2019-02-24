import { connect } from 'react-redux'
import UsersIndex from './usersIndex'

import { selectAllOtherUsers } from '../../../reducers/selectors'
import { getAllUsers } from '../../../actions/userActions'

const mapStateToProps = (state) => {
  return {
    users: selectAllOtherUsers(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex)