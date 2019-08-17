import React from 'react'
import { connect } from 'react-redux'
import { deleteMessage } from "../../../actions/messageActions"
import { isLeaderOfTrip } from "../../../helpers/permissions"
import { withRouter } from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";

class Message extends React.Component {
  render() {
    if (!this.props.message || !this.props.user) return null

    const { id, body, createdAt } = this.props.message
    const { profilePicture, fullName } = this.props.user

    return (
      <div className="Message">
        <img src={ profilePicture } className="Avatar" />
        <div className="Message-body">
          <h5 className="Message-user">
            { fullName }
          </h5>
          <p className="Message-text">{ body }</p>
          <p className="Message-timeago">{ moment(createdAt).fromNow() }</p>
        </div>

        {this.props.canDelete ?
          <button className="Message-delete-button" onClick={() => this.props.deleteMessage(id) }>
            <FontAwesomeIcon icon="times" />
          </button>
          :
          null
        }
      </div>
    )

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: Object.values(state.entities.users).find(user => user.id == ownProps.message.userId),
    canDelete: (state.session.id == ownProps.message.userId) || isLeaderOfTrip(state, ownProps.match.params.tripId)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteMessage: id => dispatch(deleteMessage(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message))