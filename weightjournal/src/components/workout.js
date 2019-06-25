import React from "react";
import styled from "styled-components";
import {} from "../state/actionCreators";

const Workout = props => {
  return (
    <div>
      <p>Date: {props.data.date}</p>
      <p>Sets: {props.data.sets}</p>
      <p>Weights:{props.data.weight}</p>
      <p>Time Elapsed: {props.data.time}</p>
    </div>
  );
};
export default Workout;
