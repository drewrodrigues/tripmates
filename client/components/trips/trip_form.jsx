import React from 'react'

class TripForm extends React.Component {
  constructor(props) {
    super(props)
  
    this.today = new Date().toISOString().split('T')[0];
  
    this.state = {
      title: "", start_date: this.today, end_date: this.today, location: "",
      creator_id: this.props.currentUserID, image_url: ""
    }

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearForm    = this.clearForm.bind(this)
  }

  handleUpdate(prop) {
    return (e) => {
      this.setState({[prop]: e.target.value})
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(e)
    const that = this

    this.props.createTrip(this.props.currentUserID, this.state).then(() => {
      console.log('clear form')
      that.clearForm()
    })
  }

  clearForm() {
    this.setState({
      title: "", start_date: this.today, end_date: this.today, location: "",
      creator_id: this.props.currentUserID
    })
  }
  
  render() {
    const {handleUpdate, handleSubmit, today} = this

    return(
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" 
            className="form-control"
            onChange={handleUpdate('title')}
            placeholder="Title"
            value={this.state.title}
          />

          <input type="date" 
            onChange={handleUpdate('start_date')}
            className="form-control"
            value={this.state.start_date}
          />

          <input type="date" 
            onChange={handleUpdate('end_date')}
            className="form-control"
            value={this.state.end_date}
          />

          <input type="text"
            placeholder="Location"
            onChange={handleUpdate('location')}
            className="form-control"
            value={this.state.location}
          />

          <input type="text"
            placeholder="Image Url"
            onChange={handleUpdate('image_url')}
            className="form-control"
            value={this.state.image_url}
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