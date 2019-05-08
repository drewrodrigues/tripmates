import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const today = new Date().toISOString().split('T')[0];
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
    this.handleImage = this.handleImage.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearForm = this.clearForm.bind(this)
  }

  componentDidMount() {
    if (this.props.actionType === "Update") {
      this.props.fetchTrip(this.props.match.params.id).then(() => {
        const { trip } = this.props
        this.setState({
          // cover_photo: trip.coverPhoto,
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
    const that = this
    const formData = new FormData()

    formData.append('trip[id]', this.state.id)
    formData.append('trip[title]', this.state.title)
    formData.append('trip[start_date]', this.state.start_date)
    formData.append('trip[end_date]', this.state.end_date)
    formData.append('trip[location]', this.state.location)
    formData.append('trip[cover_photo]', this.state.cover_photo_file)
    formData.append('trip[spaces]', this.state.spaces)
    formData.append('trip[privacy]', this.state.privacy)

    const args = this.props.actionType === "Update" ? [this.state.id, formData] : [formData]

    // TODO: spread operator not working?
    this.props.action(formData).then(res => {
      that.clearForm()
      const id = Object.keys(res.trip)[0]
      that.props.history.push(`/trips/${id}`)
    })
  }

  handleImage(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ cover_photo_file: file, cover_photo_url: fileReader.result })
    }

    if (file) {
      fileReader.readAsDataURL(file)
    }
  }

  clearForm() {
    this.setState(defaultState)
  }

  render() {
    const { handleUpdate, handleSubmit, handleImage } = this

    return(
      <div>
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
            onChange={ handleImage }
            className="form-control"
            value={ this.state.cover_photo }
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
          <label htmlFor="privacy-public">
            <FontAwesomeIcon icon="eye" />
            Visible
          </label>
          <input type="radio"
            onChange={ handleUpdate('privacy') }
            className="form-control"
            value="visible"
            id="privacy-public"
            checked={ this.state.privacy == "visible" }
          />

          <label htmlFor="privacy-private">
            <FontAwesomeIcon icon="eye-slash" />
            Hidden
          </label>
          <input type="radio"
            onChange={ handleUpdate('privacy') }
            className="form-control"
            value="hidden"
            id="privacy-private"
            checked={ this.state.privacy == "hidden" }
          />

          <button className="btn btn-success btn-sm">
            <FontAwesomeIcon icon="plus" />
            { this.props.actionType }
          </button>
        </form>
      </div>
    )
  }
}

export default TripForm