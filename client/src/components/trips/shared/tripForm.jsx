import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {handleImage} from "../../../helpers/handlers"
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
    this.deleteTrip = this.deleteTrip.bind(this)
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
          title: trip.title,
          image_preview: trip.coverPhoto
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
    this.props.deleteTrip(this.props.match.params.id).then(() => {
      this.props.history.push('/')
    })
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
      console.log(res)
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

  render() {
    const {handleUpdate, handleSubmit, handleImage} = this
    const {actionType, errors} = this.props
    const {
      end_date,
      image_preview,
      location,
      privacy,
      spaces,
      start_date,
      title
    } = this.state

    return(
      <div>
        <header className="form-header">
          <h3 className="form-title">
          {actionType === 'Create' ? "Let's add a trip" : "Edit your trip"}
          </h3>
        </header>

        <form onSubmit={handleSubmit} className="form">
          <FormErrors errors={ errors } />

          <label className="form-label"><span>What</span> should we call it?</label>
          <input type="text"
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
          <label className="form-sublabel">From</label>
          <input type="date"
            onChange={ handleUpdate('start_date') }
            className="form-input"
            value={start_date}
            data-cy="tripInput-startDate"
          />

          <label className="form-sublabel">To</label>
          <input type="date"
            onChange={ handleUpdate('end_date') }
            className="form-input"
            value={end_date}
            data-cy="tripInput-endDate"
          />

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
              className={`form-button ${spaces == 0 ? 'active' : ''}`}
              onClick={e => this.select(e, 'spaces', 0)}
              data-cy="tripInput-spaces-unlimited"
            >
              Unlimited
            </button>

            <input
              className={`form-button ${spaces != 0 ? 'active' : ''}`}
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
              className={`form-button ${privacy === 'visible' ? 'active' : ''}`}
              onClick={e => this.select(e, 'privacy', 'visible')}
              data-cy="tripInput-privacy-visible"
            >
              Visible
            </button>

            <button
              className={`form-button ${privacy === 'hidden' ? 'active' : ''}`}
              onClick={e => this.select(e, 'privacy', 'hidden')}
              data-cy="tripInput-privacy-hidden"
            >
              Hidden
            </button>
          </div>

          <footer className="form-footer">
            <div className="form-buttons">
              <button className="form-submit">
                <FontAwesomeIcon icon="plus" />
                {actionType}
              </button>
              {actionType === 'Create' ?
                <></>
                :
                <button className="form-delete" onClick={this.deleteTrip}>Delete</button>
              }
            </div>
          </footer>
        </form>

      </div>
    )
  }
}

Object.assign(TripForm.prototype, handleImage)

export default TripForm