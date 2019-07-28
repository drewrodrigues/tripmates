import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { handleImage } from "../../../helpers/handlers"
import FormErrors from '../../Shared/formErrors'

const today = new Date().toISOString().split('T')[0]
const defaultState = {
  title: "",
  start_date: today,
  end_date: today,
  location: "",
  cover_photo: "",
  spaces: 0,
  privacy: "visible"
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
  }

  componentDidMount() {
    if (this.props.actionType === "Update") {
      this.props.fetchTrip(this.props.match.params.id).then(() => {
        const { trip } = this.props
        this.setState({
          cover_photo: trip.coverPhoto,
          id: trip.id,
          end_date: trip.endDate,
          location: trip.location,
          privacy: trip.privacy,
          spaces: trip.spaces,
          start_state: trip.startDate,
          title: trip.title
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

  handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()

    formData.append('trip[id]', this.state.id)
    formData.append('trip[title]', this.state.title)
    formData.append('trip[start_date]', this.state.start_date)
    formData.append('trip[end_date]', this.state.end_date)
    formData.append('trip[location]', this.state.location)
    formData.append('trip[cover_photo]', this.state.cover_photo)
    formData.append('trip[spaces]', this.state.spaces)
    formData.append('trip[privacy]', this.state.privacy)

    this.props.action(formData).then(res => {
      this.clearForm()
      const id = Object.keys(res.trip)[0]
      this.props.history.push(`/trips/${id}`)
    })
  }

  clearForm() {
    this.setState(defaultState)
  }

  select(prop, value) {
    this.setState({[prop]: value})
  }

  render() {
    const { handleUpdate, handleSubmit, handleImage } = this
    const { errors } = this.props

    return(
      <div>
        <header className="form-header">
          <h3 className="form-title">
          {this.props.actionType === 'Create' ?
            "Let's add a trip"
          :
            "Update your trip"
          }
          </h3>
        </header>

        <form onSubmit={handleSubmit} className="form">
          <FormErrors errors={ errors } />

          <label className="form-label"><span>What</span> should we call it?</label>
          <input type="text"
            className="form-input"
            onChange={ handleUpdate('title') }
            placeholder="Title"
            value={ this.state.title }
          />

          <label className="form-label"><span>Where</span> are you going?</label>
          <input type="text"
            placeholder="Location"
            onChange={ handleUpdate('location') }
            className="form-input"
            value={ this.state.location }
            id="trip-location"
          />

          <label className="form-label"><span>When</span> are you going?</label>
          <label className="form-sublabel">From</label>
          <input type="date"
            onChange={ handleUpdate('start_date') }
            className="form-input"
            value={ this.state.start_date }
          />

          <label className="form-sublabel">To</label>
          <input type="date"
            onChange={ handleUpdate('end_date') }
            className="form-input"
            value={ this.state.end_date }
          />

          <label htmlFor="trip-photo" className="form-label">
            Cover photo
          </label>
          <input type="file"
            onChange={ e => handleImage(e, "cover_photo") }
            className="form-input"
            accept=".jpg,.jpeg,.png"
            id="trip-photo"
          />

          {this.state.image_preview ?
            <img src={ this.state.image_preview } className="tripForm-ImagePreview" />
          :
            null
          }

          <label htmlFor="trip-spaces" className="form-label">
            <FontAwesomeIcon icon="users" />
            Spaces
          </label>
          <div className="button-row">
            <button
              className={`form-button ${this.state.spaces == 0 ? 'active' : ''}`}
              onClick={() => this.select('spaces', 0)}
            >
              Unlimited
            </button>

            <input
              className={`form-button ${this.state.spaces != 0 ? 'active' : ''}`}
              onChange={ handleUpdate('spaces') }
              value={ this.state.spaces }
            />
          </div>

          <label className="form-label">
            Privacy
          </label>
          <div className="button-row">
            <button
              className={`form-button ${this.state.privacy === 'visible' ? 'active' : ''}`}
              onClick={() => this.select('privacy', 'visible')}
            >
              Visible
            </button>

            <button
              className={`form-button ${this.state.privacy === 'hidden' ? 'active' : ''}`}
              onClick={() => this.select('privacy', 'hidden')}
            >
              Hidden
            </button>
          </div>

          <footer className="form-footer">
            <button className="form-submit">
              <FontAwesomeIcon icon="plus" />
              { this.props.actionType }
            </button>
          </footer>
        </form>
      </div>
    )
  }
}

Object.assign(TripForm.prototype, handleImage)

export default TripForm