import React from "react";
import { connect } from "react-redux";
import { addWorkout } from "../state/actionCreators";

const WorkoutForm = props => {
  const dateRef = React.createRef();
  const setRef = React.createRef();
  const weightRef = React.createRef();
  const timeRef = React.createRef();
  const add = (e, id) => {
    e.preventDefault();
    props.updateWorkout(id, {
      date: dateRef.current.value,
      sets: setRef.current.value,
      weights: weightRef.current.value,
      time: timeRef.current.value
    });
  };
  return (
    <form onSubmit={e => add(e, props.exerciseId)}>
      <input type="date" ref={dateRef} />
      <input type="number" ref={setRef} />
      <input type="number" ref={weightRef} placeholder="(Kg  or Lbs)" />
      <input type="text" ref={timeRef} placeholder="in Mins" />
    </form>
  );
};
export default connect(
  null,
  { addWorkout }
)(WorkoutForm);
