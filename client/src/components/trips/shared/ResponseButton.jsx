import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ResponseButton extends React.Component {
  constructor(props) {
    super(props)
    this.callAction = this.callAction.bind(this)
  }

  callAction(e) {
    this.props.requestMade(this.props.index)
    this.props.action(e)
      .finally(e => this.props.receivedResponse())
  }

  render() {
    let buttonText
    let buttonIcon
    let spin

    if (this.props.awaitingResponse && this.props.queriedButtonIndex == this.props.index) {
      buttonText = this.props.actionableText
      buttonIcon = "spinner"
      spin = true
    } else {
      buttonText = this.props.text
      buttonIcon = this.props.icon
      spin = false
    }

    return (
      <button
        onClick={this.props.action}
        className={this.props.className}
        onClick={e => this.callAction(e)}
        disabled={this.props.awaitingResponse}
      >
        <FontAwesomeIcon icon={buttonIcon} spin={spin} />
        {buttonText} {this.props.modelType}
      </button>
    )
  }
}

ResponseButton.propTypes = {
  action: PropTypes.func.isRequired, // function to call on click
  actionableText: PropTypes.string.isRequired, // display text when requesting
  awaitingResponse: PropTypes.bool.isRequired, // response pending
  className: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  modelType: PropTypes.string, // to be displayed next to actionableText/text
  queriedButtonIndex: PropTypes.string, // is the the button that was clicked?
  text: PropTypes.string.isRequired // text to display
}

export default ResponseButton