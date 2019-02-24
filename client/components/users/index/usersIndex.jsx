import React from 'react'

class UsersIndex extends React.Component {
  componentDidMount() {
    // TODO: query for all users, other than myself
    this.props.getAllUsers()
  }
  
  render() {

    return (
      <div>
        {this.props.users.map(user => (
          <li>{user.fullName}</li>
        ))}
      </div>
    )
  }
}

export default UsersIndex