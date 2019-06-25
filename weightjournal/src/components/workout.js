import React from "react";
import styled from "styled-components";
import {} from "../state/actionCreators";

const Workout = props => {
    
  return (
    <div>
      <p>Date{props.workout.date}</p>
      <button> Edit</button>
      <button> Delete</button>
    </div>
  );
};
export default Workout;
