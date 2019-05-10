import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { handleImage } from "../../../helpers/handlers"

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

  render() {
    const { handleUpdate, handleSubmit, handleImage } = this

    return(
      <div>
        <img src={ this.state.image_preview } className="tripForm-ImagePreview" />

        <form onSubmit={handleSubmit}>
          <input type="text"
            className="form-control"
            onChange={ handleUpdate('title') }
            placeholder="Title"
            value={ this.state.title }
          />

          <input type="date"
            onChange={ handleUpdate('start_date') }
            className="form-control"
            value={ this.state.start_date }
          />

          <input type="date"
            onChange={ handleUpdate('end_date') }
            className="form-control"
            value={ this.state.end_date }
          />

          <label htmlFor="trip-location">
            <FontAwesomeIcon icon="map-marker-alt" />
            Location
          </label>
          <input type="text"
            placeholder="Location"
            onChange={ handleUpdate('location') }
            className="form-control"
            value={ this.state.location }
            id="trip-location"
          />

          <input type="file"
            onChange={ e => handleImage(e, "cover_photo") }
            className="form-control"
            accept=".jpg,.jpeg,.png"
          />

          <label htmlFor="trip-spaces">
            <FontAwesomeIcon icon="users" />
            Spaces
          </label>
          <input type="text"
            onChange={ handleUpdate('spaces') }
            className="form-control"
            value={ this.state.spaces }
            id="trip-spaces"
          />

          <h5>Privacy</h5>
          <label className="tripForm-privacy">
            <FontAwesomeIcon icon="eye" />
            Visible
            <input type="radio"
              onChange={ handleUpdate('privacy') }
              className="form-control"
              value="visible"
              checked={ this.state.privacy == "visible" }
            />
          </label>

          <label className="tripForm-privacy">
            <FontAwesomeIcon icon="eye-slash" />
            Hidden
            <input type="radio"
              onChange={ handleUpdate('privacy') }
              className="form-control"
              value="hidden"
              checked={ this.state.privacy == "hidden" }
            />
          </label>

          <button className="btn btn-success btn-sm tripForm-submit">
            <FontAwesomeIcon icon="plus" />
            { this.props.actionType }
          </button>
        </form>
      </div>
    )
  }
}

Object.assign(TripForm.prototype, handleImage)

export default TripForm