import React from 'react'
import UserIndexItem from './userIndexItem'

class UsersIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    this.props.getAllUsers().then(() => {
      this.setState({ loading: false })
    })
    this.props.getAllFriendRequests()
    this.props.getFriends()
  }

  render() {
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