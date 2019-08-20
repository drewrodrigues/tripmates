import { combineReducers } from "redux"
import errorsReducer from "./errorsReducer"
import entityReducer from "./entitiesReducer"
import sessionReducer from "./sessionsReducer"
import countsReducer from "./countsReducer";

export default combineReducers({
  counts: countsReducer,
  errors: errorsReducer,
  entities: entityReducer,
  session: sessionReducer,
})
