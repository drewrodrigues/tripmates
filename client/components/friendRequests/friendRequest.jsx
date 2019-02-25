import React from 'react'

class FriendRequest extends React.Component {
  render() {
    let button
    if (this.props.isRequested) {
      button = <button className="badge badge-warning" onClick={() => this.props.cancelRequest(this.props.friendRequest.id)}>Requested</button>
    } else if (this.props.friendRequestPending) {
      button = <>
        <button className="badge badge-success">Accept Friend Request</button>
        <button className="badge badge-danger" onClick={() => this.props.cancelRequest(this.props.friendRequest.id)}>Deny Friend Request</button>
      </>
    } else {
      button = <button 
                  className="badge badge-light"
                  onClick={this.props.addRequest}>
                  Add friend
               </button>
    }
    
    return (
      <div>
        {button}
      </div>
    )
  }
}

export default FriendRequest