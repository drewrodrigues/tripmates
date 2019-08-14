import React from 'react'
import { connect } from 'react-redux'
import UserLineItem from "../../users/UserLineItem";
import { deleteAttendRequest} from "../../../actions/attendRequestActions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AttendRequest = ({ attendRequest: { id, userId, tripId }, attendRequest, user, deleteAttendRequest, isLeader, requestingUser }) => {
  if (!userId || !user) return <div>No found {userId}</div>

  return (
    <div>
      <UserLineItem fullName={ user.fullName } profilePicture={ user.profilePicture }>
        { isLeader && (
          <button className="AttendRequest-buttons AttendRequest-buttons-accept">
            <FontAwesomeIcon icon="check" /> Accept
          </button>
        )}

        { (isLeader || requestingUser) && (
          <button className="AttendRequest-buttons AttendRequest-buttons-cancel" onClick={ () => deleteAttendRequest(id) }>
            <FontAwesomeIcon icon="trash" />{ isLeader ? "Deny" : "Cancel" }
          </button>
        )}
      </UserLineItem>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: Object.values(state.entities.users).find(user => user.id == ownProps.attendRequest.userId),
    requestingUser: state.session.id == ownProps.attendRequest.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteAttendRequest: id => dispatch(deleteAttendRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendRequest)