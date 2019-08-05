import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {handleImage} from "../../../helpers/handlers"
import {todayForInput} from "../../../helpers/formatters"
import FormErrors from '../../Shared/formErrors'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import moment from 'moment'
import ResponseButtons from './ResponseButtons'
import Loader from "../../Shared/Loader"
import Confirmation from "../../Shared/Confirmation"

const today = new Date()

const defaultState = {
  title: "",
  start_date: today,
  end_date: today,
  dateRange: [today, today],
  location: "",
  cover_photo: "",
  spaces: 0,
  privacy: "visible",
  details: "",
  loading: false,
  showConfirmation: false
}

class TripForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleImage = handleImage.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.select = this.select.bind(this)
    this.deleteTrip = this.deleteTrip.bind(this)
    this.onChange = this.onChange.bind(this)
    this.showConfirmation = this.showConfirmation.bind(this)
    this.hideConfirmation = this.hideConfirmation.bind(this)
  }

  componentDidMount() {
    if (this.props.actionType === "Update") {
      this.setState({ loading: true })
      this.props.fetchTrip(this.props.match.params.id).then(() => {
        const {trip} = this.props
        this.setState({
          cover_photo: trip.coverPhoto,
          id: trip.id,
          location: trip.location,
          privacy: trip.privacy,
          spaces: trip.spaces,
          title: trip.title,
          image_preview: trip.coverPhoto,
          dateRange: [moment(trip.startDate), moment(trip.endDate)],
          details: trip.details,
          loading: false
        })
      })
    }
  }

  componentWillUnmount() {
    this.props.clearTripErrors()
  }

  handleUpdate(prop) {
    return (e) => {
      this.setState({[prop]: e.target.value})
    }
  }

  deleteTrip(e) {
    e.preventDefault()
    return this.props.deleteTrip(this.props.match.params.id).then(() => {
      this.props.history.push('/')
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()

    formData.append('trip[id]', this.state.id)
    formData.append('trip[title]', this.state.title)
    formData.append('trip[start_date]', this.state.dateRange[0])
    formData.append('trip[end_date]', this.state.dateRange[1])
    formData.append('trip[location]', this.state.location)
    formData.append('trip[cover_photo]', this.state.cover_photo)
    formData.append('trip[spaces]', this.state.spaces)
    formData.append('trip[privacy]', this.state.privacy)
    formData.append('trip[details]', this.state.details)

    return this.props.action(formData).then(res => {
      this.clearForm()
      const id = Object.keys(res.trip)[0]
      this.props.history.push(`/trips/${id}`)
    })
  }

  clearForm() {
    this.setState(defaultState)
  }

  select(e, prop, value) {
    e.preventDefault()
    this.setState({[prop]: value})
  }

  onChange(dateRange) {
    this.setState({dateRange})
  }

  showConfirmation(e) {
    e.preventDefault()
    this.setState({ showConfirmation: true })
  }

  hideConfirmation() {
    this.setState({ showConfirmation: false })
  }

  render() {
    const {handleUpdate, handleSubmit, handleImage} = this
    const {actionType, errors} = this.props
    const {
      details,
      image_preview,
      location,
      privacy,
      spaces,
      title
    } = this.state

    let responseButtons = [{
      action: e => this.handleSubmit(e),
      actionableText: actionType == "Create" ? "Creating" : "Updating",
      className: "form-button button button-heavy button-green",
      modelType: "Trip",
      text: actionType,
      icon: actionType == "Create" ? "plus" : "edit",
    }]

    return(
      <div>
        {this.state.showConfirmation &&
        <Confirmation
          buttonText="Delete"
          callback={this.deleteTrip}
          confirmationText={title}
          close={this.hideConfirmation}
          icon="trash"
          message="Deleting a trip will remove all associated data"
          title="Are you sure?"
        />}

        <header className="form-header">
          <h3 className="form-title">
          {actionType === 'Create' ? "Let's add a trip" : "Edit your trip"}
          </h3>
        </header>

        {this.state.loading ?
          <Loader />
        :
          <form onSubmit={handleSubmit} className="form">
            <FormErrors errors={ errors } />

            <label className="form-label"><span>What</span> should we call it?</label>
            <input type="text"
              autoFocus
              className="form-input"
              onChange={ handleUpdate('title') }
              placeholder="Title"
              value={title}
              data-cy="tripInput-title"
            />

            <label className="form-label"><span>Where</span> are you going?</label>
            <input type="text"
              placeholder="Location"
              onChange={ handleUpdate('location') }
              className="form-input"
              value={location}
              id="trip-location"
              data-cy="tripInput-location"
            />

            <label className="form-label"><span>When</span> are you going?</label>
            <div data-cy="tripInput-dateRange">
              <DateRangePicker
                onChange={this.onChange}
                value={this.state.dateRange}
                className="form-input form-input-dateRange"
                data-cy="tripInput-dateRange"
              />
            </div>

            <label htmlFor="trip-photo" className="form-label">
              Cover photo
            </label>
            <input type="file"
              onChange={ e => handleImage(e, "cover_photo") }
              className="form-input"
              accept=".jpg,.jpeg,.png"
              id="trip-photo"
              data-cy="tripInput-photo"
            />

            {image_preview ?
              <img src={image_preview} className="tripForm-ImagePreview" />
              :
              null
            }

            <label htmlFor="trip-spaces" className="form-label">
              <FontAwesomeIcon icon="users" />
              Spaces
            </label>
            <div className="button-row">
              <button
                className={`form-button button button-${spaces == 0 ? 'blue' : 'white'}`}
                onClick={e => this.select(e, 'spaces', 0)}
                data-cy="tripInput-spaces-unlimited"
              >
                Unlimited
              </button>

              <input
                className={`form-button button button-${spaces != 0 ? 'blue' : 'white'}`}
                onChange={ handleUpdate('spaces') }
                value={ spaces }
                data-cy="tripInput-spaces"
              />
            </div>

            <label className="form-label">
              Privacy
            </label>
            <div className="button-row">
              <button
                className={`form-button button button-${privacy === 'visible' ? 'blue' : 'white'}`}
                onClick={e => this.select(e, 'privacy', 'visible')}
                data-cy="tripInput-privacy-visible"
              >
                Visible
              </button>

              <button
                className={`form-button button button-${privacy === 'hidden' ? 'blue' : 'white'}`}
                onClick={e => this.select(e, 'privacy', 'hidden')}
                data-cy="tripInput-privacy-hidden"
              >
                Hidden
              </button>
            </div>

            <label className="form-label">
              Details
            </label>
            <textarea
              className="form-input form-textarea"
              onChange={ handleUpdate('details') }
              value={details}
            />


            <footer className="form-footer">
              <div className="form-buttons">
                <ResponseButtons buttons={responseButtons} />
                  {actionType == "Update" && (
                    <button
                      className="form-button button button-heavy button-red"
                      onClick={this.showConfirmation}
                    >
                      <FontAwesomeIcon icon={"trash"} />
                      Delete Trip
                    </button>
                  )}
              </div>
            </footer>
          </form>
        }
      </div>
    )
  }
}

Object.assign(TripForm.prototype, handleImage)

export default TripForm