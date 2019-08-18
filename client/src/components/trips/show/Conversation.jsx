import React from 'react'
import { connect } from "react-redux"
import { createMessage, getMessages } from "../../../actions/messageActions"
import Message from "./Message"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { canSeeResourcesOfTrip } from "../../../helpers/permissions"
import { withRouter } from "react-router-dom"
import { orderByDescending } from "../../../helpers/sorters"
import Chat from "../../../assets/chat.svg"
import Binoculars from "../../../assets/binoculars.svg"
import Placeholder from "../../Shared/Placeholder"
import { handleLoading } from "../../../helpers/handlers"
import Loader from "../../Shared/Loader"

// TODO: Pull message form into seperate component

class Conversation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { messageInput: "", loading: true }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLoading = handleLoading.bind(this)
  }

  componentDidMount() {
    if (this.props.canSeeResourcesOfTrip) {
      this.handleLoading(this.props.getMessages)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createMessage(this.props.match.params.tripId, { body: this.state.messageInput })
    this.setState({ messageInput: "" })
  }

  render() {
    if (this.props.canSeeResourcesOfTrip) {
      if (this.state.loading) return <Loader />

      return (
        <>
          {this.props.messages.length == 0 ?
            <Placeholder image={Chat} title="No Messages Yet" text="You should try sending one">
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
            </Placeholder>
          :
            <>
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
              <ul className="Conversation">
                {this.props.messages.map(message => (
                  <Message message={ message } />
                ))}
              </ul>
            </>
          }

        </>
      )
    } else {
      return <Placeholder image={Binoculars} title="No Peeking" text="You must join this trip to join the conversations" />
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    messages: orderByDescending('createdAt', Object.values(state.entities.messages)),
    canSeeResourcesOfTrip: canSeeResourcesOfTrip(state, ownProps.match.params.tripId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createMessage: (tripId, message) => dispatch(createMessage(tripId, message)),
    getMessages: () => dispatch(getMessages(ownProps.match.params.tripId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conversation))