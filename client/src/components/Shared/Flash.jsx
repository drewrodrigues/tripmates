import React from 'react'
import { connect } from 'react-redux'
import { clearFlash } from "../../actions/flashActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Flash = props => {
  if (props.messages.length == 0) return null

  return (
    <div className="Flash-container" onClick={props.clearFlash}>
      <div className="Flash">
        {props.messages.map(message => (
          message
        ))}
        <FontAwesomeIcon icon="times" />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  messages: state.flash
})

const mapDispatchToProps = dispatch => ({
  clearFlash: () => dispatch(clearFlash())
})

export default connect(mapStateToProps, mapDispatchToProps)(Flash)
