import React from 'react'
import { connect } from 'react-redux'
import UserLineItem from "../../users/UserLineItem";
import { deleteAttendance } from "../../../actions/attendanceActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Attendee = ({ id, userId, user, deleteAttendance }) => {
  if (!user) return null
  return <>
    <UserLineItem profilePicture={ user.profilePicture } fullName={ user.fullName }>
      <button onClick={() => deleteAttendance(id) } className="button button-small button-muted">
        <FontAwesomeIcon icon="times" />
      </button>
    </UserLineItem>
  </>
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: Object.values(state.entities.users).find(user => user.id == ownProps.userId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteAttendance: id => dispatch(deleteAttendance(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendee)