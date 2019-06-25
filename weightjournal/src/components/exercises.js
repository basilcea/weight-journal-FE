import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getExercises } from "../state/actionCreators";
import Exercise from "./exercise";
import uuid from "uuid";
class Exercises extends React.Component {
  componentDidMount() {
    this.props.getExercises();
  }
  render() {
    return (
      <div>
      {console.log(this.props.error)}
        <h2> My Lifts</h2>
        {!this.props.error && this.props.exercises.map(exercise => {
          return(<div key={exercise.id}>
            <Exercise data={exercise} />
          </div>)
        })}
        {this.props.error && <div>
                <p>No Lifts Found</p>
                <p>{this.props.error}</p>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = exerciseReducer => {
  return {
    exercises: exerciseReducer.exercises.exercises,
    error: exerciseReducer.exercise.error
  };
};

export default connect(
  mapStateToProps,
  { getExercises }
)(Exercises);
