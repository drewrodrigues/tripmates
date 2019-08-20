import { combineReducers } from "redux"
import tripCountsReducer from "./counts/tripCountsReducer"

export default combineReducers({
  tripCounts: tripCountsReducer
})
