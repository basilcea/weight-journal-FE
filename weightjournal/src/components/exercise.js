import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import {
  getExercise,
  deleteExercises,
  updateExercises
} from "../state/actionCreators";
import Workouts from "./workouts";
import WorkoutForm from "./workoutForm";

const Exercise = props => {
  const [change, setChange] = useState(false);
  const nameRef = React.createRef();
  const bodyRef = React.createRef();

  useEffect(() => {
    props.getExercise(props.match.params.id);
  }, []);

  const edit = e => {
    e.preventDefault();
    props.updateExercises(props.match.params.id, {
      name: nameRef.current.value,
      body: bodyRef.current.value
    });
    nameRef.current.value = "";
    setChange(false);
  };
  if (props.fetching) {
    return <div>Loading ---- </div>;
  }
  if (!props.fetching) {
    if (!props.error) {
      return (
        <Fragment>
          <div>
            {!change && (
              <div>
                <div>
                  <img src={props.src} alt="" />
                </div>
                <p>{props.name}</p>
                <p>Body Target: {props.body}</p>
                <button onClick={() => setChange(true)}>Edit</button>
              </div>
            )}
            {change && (
              <form onSubmit={e => edit(e)}>
                <input ref={nameRef} value={props.name} type="text" />
                <input ref={bodyRef} value={props.body} type="text" />
                <button>Save</button>
              </form>
            )}
          </div>

          <div>
            <WorkoutForm exerciseId={props.match.params.id} />
            <Workouts exerciseId={props.match.params.id} />
          </div>
          <button onClick={() => props.deleteExercises(props.match.params.id)}>
            Delete
          </button>
        </Fragment>
      );
    } else {
      return (
        <div>
          Page Not Found
          <p>{props.error}</p>
        </div>
      );
    }
  }
};
const mapStateToProps = ({ exerciseReducer }) => {
  return {
    exercise: exerciseReducer.exercise,
    fetching: exerciseReducer.gettingExercise,
    error: exerciseReducer.error
  };
};

export default connect(
  mapStateToProps,
  { getExercise, deleteExercises, updateExercises }
)(Exercise);
