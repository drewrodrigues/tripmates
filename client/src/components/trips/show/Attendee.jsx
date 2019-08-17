import React from 'react'
import { connect } from 'react-redux'
import UserLineItem from "../../users/UserLineItem";


const Attendee = ({ id, userId, user }) => {
  if (!user) return null
  return <>
    <UserLineItem profilePicture={ user.profilePicture } fullName={ user.fullName }/>
  </>
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: Object.values(state.entities.users).find(user => user.id == ownProps.userId)
  }
}

export default connect(mapStateToProps)(Attendee)