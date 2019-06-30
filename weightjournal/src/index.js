import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import App from  './App';
import { exeReducer, workoutReducer,exercisesReducer ,loginReducer, registerReducer , userReducer} from "./state/reducers";

const combinedReducer = combineReducers({
  registerReducer,
  exercisesReducer,
  exeReducer,
  workoutReducer,
  loginReducer,
  userReducer
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
