import React from 'react'
import UserIndexItem from './userIndexItem'
import Loader from "../../Shared/Loader"
import { handleLoading } from "../../../helpers/handlers"

class UsersIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
    this.handleLoading = handleLoading.bind(this)
  }

  componentDidMount() {
    const { getAllUsers, getAllFriendRequests, getFriends } = this.props
    this.handleLoading([getAllUsers(), getAllFriendRequests(), getFriends()])
  }

  render() {
    if (this.state.loading) return <Loader />

    return (
      <ul className="usersIndex">
        { this.props.users.map(user => (
          <UserIndexItem key={ user.id } user={ user } />
        ) ) }
      </ul>
    )
  }
}

export default UsersIndex