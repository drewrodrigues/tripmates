import React from 'react'

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

  handleUpdate(prop) {
    return (e) => {
      this.setState({[prop]: e.target.value})
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const that = this
    const formData = new FormData()

    formData.append('trip[title]', this.state.title)
    formData.append('trip[start_date]', this.state.start_date)
    formData.append('trip[end_date]', this.state.end_date)
    formData.append('trip[location]', this.state.location)
    formData.append('trip[cover_photo]', this.state.cover_photo_file)
    formData.append('trip[spaces]', this.state.spaces)
    formData.append('trip[privacy]', this.state.privacy)

    this.props.createTrip(this.props.currentUserID, formData).then(res => {
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

          <input type="text"
            placeholder="Location"
            onChange={ handleUpdate('location') }
            className="form-control"
            value={ this.state.location }
          />

          <input type="file"
            onChange={ handleImage }
            className="form-control"
            value={ this.state.cover_photo }
          />

          <input type="text"
            onChange={ handleUpdate('spaces') }
            className="form-control"
            value={ this.state.spaces }
          />

          <h5>Privacy</h5>

          <label for="#privacy-public">Visible</label>
          <input type="radio"
            onChange={ handleUpdate('privacy') }
            className="form-control"
            value="visible"
            id="privacy-public"
            checked={ this.state.privacy == "visible" }
          />

          <label for="#privacy-private">Hidden</label>
          <input type="radio"
            onChange={ handleUpdate('privacy') }
            className="form-control"
            value="hidden"
            id="privacy-private"
            checked={ this.state.privacy == "hidden" }
          />

          <input type="submit"
            className="btn btn-success btn-sm"
            value="Create Trip"  
          />
        </form>    
      </div>
    )
  }
}

export default TripForm