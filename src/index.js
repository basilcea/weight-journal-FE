import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import App from  './App';
import { journalReducer, repsReducer,journalsReducer ,loginReducer, registerReducer} from "./state/reducers";

const combinedReducer = combineReducers({
  users: registerReducer,
  journals: journalsReducer,
  journal: journalReducer,
  reps: repsReducer,
  loggedIn: loginReducer,
});
const store = createStore(
  combinedReducer,
  {},
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
