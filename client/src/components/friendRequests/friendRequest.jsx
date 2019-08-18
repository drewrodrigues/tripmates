import React from 'react'
import ResponseButtons from "../trips/shared/ResponseButtons"

class FriendRequest extends React.Component {
  render() {
    let responseButtons = []
    if (this.props.isRequested) {
      responseButtons = [{
        action: () => this.props.cancelRequest(this.props.friendRequestId),
        actionableText: "Canceling",
        className: "friend-data friend-button friendRequest-requested",
        modelType: "Friend Request",
        text: "Cancel",
        icon: "trash"
      }]
    } else if (this.props.isFriend) {
      responseButtons = [{
        action: () => this.props.deleteFriend(this.props.friendRecordId),
        actionableText: "Removing",
        className: "friend-data friend-button friend-delete",
        modelType: "Friend",
        text: "Remove",
        icon: "user-minus"
      }]
    } else if (this.props.friendRequestPending) {
      responseButtons = [
        {
          action: () => this.props.addFriend(this.props.friendRequestId),
          actionableText: "Accepting",
          className: "friend-data friend-button friendRequest-accept",
          modelType: "Friend",
          text: "Accept",
          icon: "check"
        },
        {
          action: () => this.props.cancelRequest(this.props.friendRequestId),
          actionableText: "Denying",
          className: "friend-data friend-button friendRequest-deny",
          modelType: "Friend Request",
          text: "Deny",
          icon: "times"
        }
      ]
    } else {
      responseButtons = [{
        action: () => this.props.addRequest(),
        actionableText: "Sending",
        className: "friend-data friend-button friendRequest-add",
        modelType: "Friend Request",
        text: "Send",
        icon: "user-plus"
      }]
    }

    return (
      <div>
        <ResponseButtons buttons={responseButtons} />
      </div>
    )
  }
}

export default FriendRequest