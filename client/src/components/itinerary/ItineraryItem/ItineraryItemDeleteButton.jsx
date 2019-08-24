import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { deleteItineraryItem } from "../../../actions/intineraryItemActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ItineraryItemDeleteButton = ({ id, deleteItineraryItem }) => {
  return (
    <button
      className="ItineraryItemDeleteButton"
      onClick={() => deleteItineraryItem(id)}
    >
      <FontAwesomeIcon icon="times" />
      Delete
    </button>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteItineraryItem: id => dispatch(deleteItineraryItem(ownProps.match.params.tripId, id))
})

export default withRouter(connect(null, mapDispatchToProps)(ItineraryItemDeleteButton))