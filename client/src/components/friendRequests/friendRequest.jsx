import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class FriendRequest extends React.Component {
  render() {
    let button
    if (this.props.isRequested) {
      button = <button className="friend-data friend-button friendRequest-requested" onClick={() => this.props.cancelRequest(this.props.friendRequestId)}>
        <FontAwesomeIcon icon="trash" />
        Cancel Friend Request
      </button>
    } else if (this.props.isFriend) {
      button = <button className="friend-data friend-button friend-delete" onClick={() => this.props.deleteFriend(this.props.friendRecordId)}>
        <FontAwesomeIcon icon="user-minus" />
        Remove Friend
      </button>
    } else if (this.props.friendRequestPending) {
      button = <>
        <button className="friend-data friend-button friendRequest-accept" onClick={() => this.props.addFriend(this.props.friendRequestId)}>
          <FontAwesomeIcon icon="check" />
          Accept Friend Request
        </button>
        <button className="friend-data friend-button friendRequest-deny" onClick={() => this.props.cancelRequest(this.props.friendRequestId)}>
          <FontAwesomeIcon icon="times" />
          Deny Friend Request
        </button>
      </>
    } else {
      button = <>
        <button
          className="friend-data friend-button friendRequest-add"
          onClick={() => this.props.addRequest()}
        >
          <FontAwesomeIcon icon="user-plus" />
          Send Friend Request
        </button>
      </>
    }

    return (
      <div>
        <div className="friend-buttons">{button}</div>
      </div>
    )
  }
}

export default FriendRequest