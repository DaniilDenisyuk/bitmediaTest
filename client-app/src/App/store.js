import { createStore, applyMiddleware, combineReducers } from "redux";
import { statsReducer } from "../features/stats/statsSlice";

import thunk from "redux-thunk";

export default createStore(
  combineReducers({
    stats: statsReducer,
  }),
  applyMiddleware(thunk)
);
