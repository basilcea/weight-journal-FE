import React , {useEffect} from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {getWorkouts} from "../state/actionCreators";
import Workout from './workout';

const Workouts = props => {
    useEffect(() => {
        props.getWorkouts(Number(props.exerciseId))
    },[])
  return (
    <div>
      {props.workouts && props.workouts.map(workout => 
        <div key={workout.id}><Workout data={workout}/></div>)}
      {!props.workouts && <div> No Workouts Found </div>}
    </div>
  );
};
const mapStateToProps=({workoutReducer}) => {
    return ({
        workouts: workoutReducer.workout
    })
}
export default connect(mapStateToProps, {getWorkouts})(Workouts);
