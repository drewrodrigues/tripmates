import React from 'react'
import UserIndexItem from './userIndexItem'

class UsersIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    // TODO: query for all users, other than myself
    // TODO: getAllUsersWithFriendRequestData
    this.props.getAllUsers().then(() => {
      this.setState({ loading: false })
    })
    this.props.getAllFriendRequests()
  }

  render() {
    return (
      <ul className="list-group">
        { this.props.users.map(user => (
          <UserIndexItem key={ user.id } user={ user } />
        ) ) }
      </ul>
    )
  }
}

export default UsersIndex