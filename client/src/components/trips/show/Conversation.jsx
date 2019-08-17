import React from 'react'
import { connect } from "react-redux"
import { createMessage, getMessages } from "../../../actions/messageActions"
import Message from "./Message"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { canSeeResourcesOfTrip } from "../../../helpers/permissions";
import { withRouter } from "react-router-dom"
import CantSeeResourcesPlaceholder from "../../Shared/CantSeeResourcesPlaceholder"

class Conversation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { messageInput: "" }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.canSeeResourcesOfTrip) {
      this.props.getMessages()
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createMessage(this.props.match.params.tripId, { body: this.state.messageInput })
    this.setState({ messageInput: "" })
  }

  render() {
    if (this.props.canSeeResourcesOfTrip) {
      return (
        <>
          <ul className="Conversation">
            {this.props.messages.map(message => (
              <Message message={ message }/>
            ))}

          </ul>

          <form className="Conversation-AddMessage-container" onSubmit={ this.handleSubmit }>
            <input
              type="text"
              className="Conversation-AddMessage-input"
              value={ this.state.messageInput }
              onChange={ e => this.setState({ messageInput: e.target.value })}
            />
            <button className="Conversation-AddMessage-button">
              <FontAwesomeIcon icon="paper-plane" />
              Send
            </button>
          </form>
        </>
      )
    } else {
      return <CantSeeResourcesPlaceholder resourceName={"Conversations"} />
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: Object.values(state.entities.messages),
    canSeeResourcesOfTrip: canSeeResourcesOfTrip(state, ownProps.match.params.tripId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createMessage: (tripId, message) => dispatch(createMessage(tripId, message)),
    getMessages: () => dispatch(getMessages(ownProps.match.params.tripId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conversation))