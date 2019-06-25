import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getWorkouts,
  updateWorkout,
  deleteWorkout
} from "../state/actionCreators";
import Workout from "./workout";

const Workouts = props => {
  const dateRef = React.createRef();
  const setRef = React.createRef();
  const weightRef = React.createRef();
  const timeRef = React.createRef();

  console.log(props);
  const [change, setChange] = useState(false);

  useEffect(() => {
    props.getWorkouts(Number(props.exerciseId));
  }, []);
  return (
    <div>
      {props.workouts &&
        props.workouts.map(workout => (
          <div key={workout.id}>
            {!change && (
              <div>
                <Workout data={workout} />
                <button onClick={() => setChange(true)}> Edit</button>
                <button onClick={() => props.deleteWorkout(workout.id)}>
                  {" "}
                  Delete
                </button>
              </div>
            )}
            {change && (
              <form>
                <input type="date" ref={dateRef} value={workout.date} />
                <input type="number" ref={setRef} value={workout.sets} />
                <input
                  type="number"
                  ref={weightRef}
                  value={workout.weights}
                  placeholder="(Kg  or Lbs)"
                />
                <input
                  type="text"
                  ref={timeRef}
                  value={workout.time}
                  placeholder="in Mins"
                />
              </form>
            )}
          </div>
        ))}
      {!props.workouts && <div> No Workouts Found </div>}
    </div>
  );
};
const mapStateToProps = ({ workoutReducer }) => {
  return {
    workouts: workoutReducer.workout
  };
};
export default connect(
  mapStateToProps,
  { getWorkouts, updateWorkout, deleteWorkout }
)(Workouts);