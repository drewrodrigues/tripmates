import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import TimePicker from 'react-time-picker'
import FormErrors from "../Shared/formErrors";

const today = new Date()

const defaultState = {
  // form
  title: "",
  description: "",
  date_range: [today, today],
  start_date: null,
  end_date: null,
  start_time: null,
  end_time: null,
  position: null,
  errors: [],
  // component
  useDates: false,
  useTimes: false
}

class ItineraryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this)
  }


  handleSubmit(e) {
    e.preventDefault()
    const params = {
      ...this.state,
      start_date: (this.state.useDates ? this.state.date_range[0] : null),
      end_date: (this.state.useDates ? this.state.date_range[1] : null),
      start_time: (this.state.useTimes ? this.state.start_time : null),
      end_time: (this.state.useTimes ? this.state.end_time : null)
    }

    this.props.action(params)
      .then(() => {
        this.setState(defaultState)
        this.props.toggleForm()
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  hasError(prop) {
    return this.state.errors[prop]
  }

  errorsFor(prop) {
    return this.state.errors[prop]
  }

  toggle(e, prop) {
    e.preventDefault()
    this.setState({ [prop]: !this.state[prop] })
  }

  render() {
    if (!this.props.showForm) return null

    // TODO: use actual components once they are created, so the create form
    // looks just like the created resource
    // TODO: pull into input components that handle errors w/ messages
    return (
      <form onSubmit={this.handleSubmit} className="ItineraryForm">
        <label>Title</label>
        { this.hasError('title') && <h2>{ this.errorsFor('title') }</h2>}
        <input
          type="text"
          onChange={e => this.setState({ title: e.target.value })}
          value={this.state.title}
          className={`form-input ${this.hasError('title') && 'error'}`}
        />

        <label>Description</label>
        <input
          type="text"
          onChange={e => this.setState({ description: e.target.value })}
          value={this.state.description}
          className="form-input"
        />


        <a className="button button-green" onClick={e => this.toggle(e, 'useDates')}>{ this.state.useDates ? "Using dates" : "Not using dates"}</a>
        {this.state.useDates && (<>
          <h3>Date <span>optional</span></h3>
          <label className="form-label"><span>When</span> are you going?</label>
          <DateRangePicker
            onChange={date_range => this.setState({ date_range })}
            value={this.state.date_range}
            className="form-input form-input-dateRange"
            data-cy="tripInput-dateRange"
          />
        </>)}

        <a className="button button-green" onClick={e => this.toggle(e, 'useTimes')}>{ this.state.useTimes ? "Using times" : "Not using times"}</a>
        {this.state.useTimes && (<>
          <h3>Time <span>optional</span></h3>
          <label className="form-label"><span>What time?</span></label>
          <div data-cy="tripInput-start_time">
            <TimePicker
              onChange={start_time => this.setState({ start_time })}
              value={this.state.start_time}
            />
          </div>

          <div data-cy="tripInput-endTime">
            <TimePicker
              onChange={end_time => this.setState({ end_time })}
              value={this.state.end_time}
            />
          </div>
        </>)}

        <button>Create</button>
      </form>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  // TODO: if edit, an id will be passed down & fetch that trip
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    action: item => dispatch(ownProps.action(ownProps.match.params.tripId, item))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ItineraryForm)
)