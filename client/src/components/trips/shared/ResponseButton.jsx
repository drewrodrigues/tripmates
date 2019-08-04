import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/*
Example usage:


<ResponseButton
  action={e => this.handleSubmit(e)}
  actionableText={actionType == "Create" ? "Creating" : "Updating" }
  className="form-button button button-heavy button-green"
  modelName="Trip"
  text={actionType} // Create or Update
  icon="plus"
/>

*/

class ResponseButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { awaitingResponse: false }
    this.callAction = this.callAction.bind(this)
  }

  callAction(e) {
    this.setState({ awaitingResponse: true })
    this.props.action(e)
      .finally(e => this.setState({ awaitingResponse: false }))
  }

  render() {
    let buttonText
    let buttonIcon
    let spin
    if (this.state.awaitingResponse) {
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
        disabled={this.state.awaitingResponse}
      >
        <FontAwesomeIcon icon={buttonIcon} spin={spin} />
        {buttonText} {this.props.modelType}
      </button>
    )
  }
}

ResponseButton.propTypes = {
  action: PropTypes.func.isRequired,
  actionableText: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  modelType: PropTypes.string,
  text: PropTypes.string.isRequired
}

export default ResponseButton