import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker"
import { handleImage } from "../../helpers/handlers"
import TimePicker from 'react-time-picker'
import FormErrors from "../Shared/formErrors";
import ResponseButtons from "../trips/shared/ResponseButtons";

const today = new Date()

// TODO: change state to handle form updates and component state differently
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
  photo: null,
  errors: [],
  files: [],
  // component
  useDates: false,
  useTimes: false,
}

class ItineraryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleImage = handleImage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this)
  }


  handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()

    formData.append(`itinerary_item[title]`, this.state.title)
    formData.append(`itinerary_item[description]`, this.state.description)
    formData.append(`itinerary_item[position]`, this.state.position)

    if (this.state.useDates) {
      formData.append('itinerary_item[start_date]', this.state.date_range[0])
      formData.append('itinerary_item[end_date]', this.state.date_range[1])
    } else {
      formData.append('itinerary_item[start_date]', null)
      formData.append('itinerary_item[end_date]', null)
    }

    if (this.state.useTimes) {
      formData.append('itinerary_item[start_time]', this.state.start_time)
      formData.append('itinerary_item[end_time]', this.state.end_time)
    } else {
      formData.append('itinerary_item[start_time]', null)
      formData.append('itinerary_item[end_time]', null)
    }

    if (this.state.photo) {
      formData.append('itinerary_item[photo]', this.state.photo)
    }
    for (let i = 0; i < this.state.files.length; i++) {
      formData.append('itinerary_item[files][]', this.state.files[i])
    }

    return this.props.action(formData)
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
      <form className="ItineraryForm">
        <FormErrors errors={this.state.errors} />

        <label className="form-label">Title</label>
        { this.hasError('title') && <h2>{ this.errorsFor('title') }</h2>}
        <input
          type="text"
          onChange={e => this.setState({ title: e.target.value })}
          value={this.state.title}
          className={`form-input ${this.hasError('title') && 'error'}`}
        />

        <label>Description <span>(optional)</span></label>
        <textarea
          type="text"
          onChange={e => this.setState({ description: e.target.value })}
          // value={this.state.description}
          className="form-textarea"
        >
          {this.state.description}
        </textarea>

        <label>Photo <span>(optional)</span></label>
        <input type="file"
               onChange={ e => this.setState({ photo: e.target.files[0] }) }
               className="form-input"
               accept=".jpg,.jpeg,.png,.gif"
        />

        <label>Attachments <span>(optional)</span></label>
        <input type="file" className="form-input" multiple onChange={e => {
          window.files = e.target.files
          this.setState({ files: e.target.files })
        }} />

        <a className={`button button-toggle ${this.state.useDates ? 'button-blue' : 'button-gray'}`}
           onClick={e => this.toggle(e, 'useDates')}>
          { this.state.useDates ? "Using dates" : "Not using dates"
        }</a>
        <a className={`button button-toggle ${this.state.useTimes ? 'button-blue' : 'button-gray'}`}
           onClick={e => this.toggle(e, 'useTimes')}
        >
          { this.state.useTimes ? "Using times" : "Not using times"}
        </a>

        {this.state.useDates && (<>
          <label>Date <span>(optional)</span></label>
          <DateRangePicker
            onChange={date_range => this.setState({ date_range })}
            value={this.state.date_range}
            className="form-input form-input-dateRange"
            data-cy="tripInput-dateRange"
          />
        </>)}

        {this.state.useTimes && (<>
          <label>Time <span>(optional)</span></label>
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

        <ResponseButtons buttons={[
          {
            action: e => this.handleSubmit(e),
            actionableText: "Creating",
            className: "button button-green form-submit",
            modelType: "Item",
            text: "Create",
            icon: "plus"
          }
        ]}/>
      </form>
    )
  }
}

Object.assign(ItineraryForm.prototype, handleImage)

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