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

  useEffect(() => {
    props.getExercise(props.match.params.id);
  }, []);

  const edit = e => {
      e.preventDefault();
    props.updateExercises(props.match.params.id , {
        name: nameRef.current.value
    });
    nameRef.current.value ='';
    setChange(false);
  };
  return (
    <Fragment>
      <div>
        {!change && (
          <div>
            <p>{props.name}</p>
            <button onClick={() => setChange(true)}>Edit</button>
          </div>
        )}
        {change && (
          <form onClick={e => edit(e)}>
            <input ref={nameRef} />
            <button>Save</button>
          </form>
        )}
      </div>

      <div>
        {/* <WorkoutForm /> */}
        <Workouts exerciseId={props.match.params.id} />
      </div>
      <button onClick={() => props.deleteExercises(props.match.params.id)}>
        Delete
      </button>
    </Fragment>
  );
};
const mapStateToProps = ({ exerciseReducer }) => {
  return {
    exercise: exerciseReducer.exercise,
    error: exerciseReducer.error,
  };
};

export default connect(
  mapStateToProps,
  { getExercise, deleteExercises, updateExercises }
)(Exercise);
