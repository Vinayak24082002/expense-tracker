import { legacy_createStore as createStore, combineReducers } from "redux";
import expenseTrackerReducer, {
  initialState,
} from "../features/expenseTracker";

// const rootReducer = combineReducers({
//   expenseTracker: expenseTrackerReducer,
// });

// const store = createStore(rootReducer);

const store = createStore(
  expenseTrackerReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;