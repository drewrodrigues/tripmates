import React from 'react'
import PropTypes from 'prop-types'
import ResponseButton from "./ResponseButton"

/*
example usage:
const responseButtons = [
  {
    action: e => this.handleSubmit(e),
    actionableText: actionType == "Create" ? "Creating" : "Updating",
    className: "form-button button button-heavy button-green",
    modelType: "Trip",
    text: actionType,
    icon: actionType == "Create" ? "plus" : "edit",
  },
  {
    action: e => this.deleteTrip(e),
    actionableText: "Deleting",
    className: "form-button button button-heavy button-red",
    modelType: "Trip",
    text: "Delete",
    icon: "trash"
  }
]

<ResponseButtons
  buttons={responseButtons}
/>

*/

class ResponseButtons extends React.Component {
  constructor(props) {
    super(props)
    this.state = { awaitingResponse: false }
    this.requestMade = this.requestMade.bind(this)
    this.receivedResponse = this.receivedResponse.bind(this)
  }

  requestMade(queriedButtonIndex) {
    this.setState({ awaitingResponse: true, queriedButtonIndex })
  }

  receivedResponse() {
    this.setState({ awaitingResponse: false })
  }

  render() {
    return (
      this.props.buttons.map((button, i) => (
        <ResponseButton
          {...button}
          key={i}
          index={i}
          awaitingResponse={this.state.awaitingResponse}
          requestMade={this.requestMade}
          receivedResponse={this.receivedResponse}
          queriedButtonIndex={this.state.queriedButtonIndex}
        />
      ))
    )
  }
}

ResponseButtons.propTypes ={
  buttons: PropTypes.array.isRequired
}

export default ResponseButtons