import React from 'react'

class TripForm extends React.Component {
  constructor(props) {
    super(props)
  
    this.today = new Date().toISOString().split('T')[0];
    this.formShown = false
    this.state = {
      title: "", 
      start_date: this.today,
      end_date: this.today,
      location: "",
      cover_photo: "",
      spaces: 0
    }

    this.handleImage = this.handleImage.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.displayForm = this.displayForm.bind(this)
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
    console.log(formData)

    this.props.createTrip(this.props.currentUserID, formData).then(() => {
      this.formShown = false
      that.clearForm()
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
    this.setState({
      title: "", 
      start_date: this.today,
      end_date: this.today,
      location: "",
      cover_photo: "",
      spaces: 0
    })
  }

  displayForm() {
    this.formShown = true
    this.forceUpdate()
  }
  
  render() {
    if (!this.formShown) {
      return <button onClick={ this.displayForm } className="btn btn-sm btn-success">Add a trip</button>
    }

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