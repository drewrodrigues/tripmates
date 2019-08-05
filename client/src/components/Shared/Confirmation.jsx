import React from 'react'
import PropTypes from "prop-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Confirmation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { input: "", canSubmit: false }
    this.update = this.update.bind(this)
    this.hide = this.hide.bind(this)
  }

  update(e) {
    let newState
    if (this.props.confirmationText == e.target.value) {
      newState = { input: e.target.value, canSubmit: true }
    } else {
      newState = { input: e.target.value, canSubmit: false }
    }
    this.setState(newState)
  }

  hide(e) {
    if (e.target.className == "Confirmation") {
      this.props.close()
    }
  }

  render() {
    return (
      <div className="Confirmation" onClick={this.hide}>
        <div className="Confirmation-container">
          <form onSubmit={this.props.callback}>
            <h4 className="Confirmation-title">{this.props.title}</h4>
            <label className="Confirmation-label form-label">{this.props.message}</label>

            <p className="Confirmation-detail">If you would like to continue, type <b>{this.props.confirmationText}</b> then click <b>{this.props.buttonText}</b></p>
            <input
              autoFocus
              className="Confirmation-input form-input"
              onChange={this.update}
              type="text"
              value={ this.state.input }
            />
            <button
              className={`button button-heavy button-${this.state.canSubmit ? "red" : "disabled"}`}
              disabled={!this.state.canSubmit}
            >
              <FontAwesomeIcon icon={this.props.icon} />
              { this.props.buttonText }
            </button>
          </form>
        </div>
      </div>
    )
  }
}

Confirmation.propTypes = {
  buttonText: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}


export default Confirmation