import React from 'react'

class FriendRequest extends React.Component {
  render() {
    let button
    if (this.props.isRequested) {
      button = <button className="badge badge-warning" onClick={() => this.props.cancelRequest(this.props.friendRequestId)}>Requested</button>
    } else if (this.props.isFriend) {
      button = <button className="button button-heavy button-red" onClick={() => this.props.deleteFriend(this.props.friendRecordId)}>Remove Friend</button>
    } else if (this.props.friendRequestPending) {
      button = <>
        <button className="badge badge-success" onClick={() => this.props.addFriend(this.props.friendRequestId)}>Accept Friend Request</button>
        <button className="badge badge-danger" onClick={() => this.props.cancelRequest(this.props.friendRequestId)}>Deny Friend Request</button>
      </>
    } else {
      button = <>
        <button
          className="badge badge-light"
          onClick={() => this.props.addRequest()}
        >
          Send friend request
        </button>
      </>
    }

    return (
      <div>
        {button}
      </div>
    )
  }
}

export default FriendRequest