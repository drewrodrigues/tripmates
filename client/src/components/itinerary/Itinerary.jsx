import React from 'react'
import { connect } from 'react-redux'
import {
  createItineraryItem,
  getItineraryItems
} from "../../actions/intineraryItemActions"
import { itineraryItemsForTripId, userCanManageItinerary } from "../../helpers/selectors"
import { handleLoading } from "../../helpers/handlers";
import Loader from "../Shared/Loader";
import Placeholder from "../Shared/Placeholder"
import ItineraryPlaceholderImage from "../../assets/itinerary.svg"
import ItineraryToggleFormButton from './ItineraryToggleFormButton'
import ItineraryForm from "./ItineraryForm";
import ItineraryItem from "./ItineraryItem";

class Itinerary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, showForm: false }
    this.handleLoading = handleLoading.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
  }

  componentDidMount() {
    this.handleLoading(this.props.getItineraryItems)
  }

  toggleForm() {
    this.setState({ showForm: !this.state.showForm })
  }

  render() {
    if (this.state.loading) return <Loader />
    if (this.props.itineraryItems.length == 0) {
      return (
        <Placeholder
          title="Nothing here yet"
          text="Try adding something"
          image={ItineraryPlaceholderImage}
        >
          {this.props.userCanManageItinerary && (
            <ItineraryForm
              showForm={true}
              action={createItineraryItem}
              toggleForm={this.toggleForm}
            />
          )}
        </Placeholder>
      )
    }

    return (
      <>
        {this.props.userCanManageItinerary && (
          <ItineraryToggleFormButton
            toggleForm={this.toggleForm}
            formShown={this.state.showForm}
            toggleForm={this.toggleForm}
          />
        )}

        <ItineraryForm
          showForm={this.state.showForm}
          action={createItineraryItem}
          toggleForm={this.toggleForm}
        />
        <ul>
          {this.props.itineraryItems.map(item => <ItineraryItem item={item} />)}
        </ul>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  itineraryItems: itineraryItemsForTripId(state, ownProps.match.params.tripId),
  userCanManageItinerary: userCanManageItinerary(state, ownProps.match.params.tripId) ||
                          state.entities.trips[ownProps.match.params.tripId].creatorId == state.session.id
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getItineraryItems: () => dispatch(getItineraryItems(ownProps.match.params.tripId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)
