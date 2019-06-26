import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getExercises,
  deleteExercises,
  addExercises
} from "../state/actionCreators";
import { Redirect } from "react-router-dom";
import { nameArray, targetArray } from "../data";
import { Link } from "react-router-dom";
class Exercises extends React.Component {
  componentDidMount() {
    this.props.getExercises();
  }
  nameRef = React.createRef();
  bodyRef = React.createRef();

  add = e => {
    e.preventDefault();
    this.props.addExercises({
      name: this.nameRef.current.value,
      body: this.bodyRef.current.value,
      src: this.getImage(this.nameRef.current.value)
    });
    this.nameRef.current.value = "";
    this.bodyRef.current.value = "";
  };
  getImage = value => {
    const single = nameArray.find(name => name.name === value);
    return single.src;
  };
  render() {
    let data = nameArray.map(exercise => (
      <option key={exercise.name} value={exercise.name} />
    ));
    let bodyParts = targetArray.map(body => <option key={body} value={body} />);
    return (
      <div>
        <h2> My Lifts</h2>
        <form onSubmit={this.add}>
          <input
            list="names"
            placeholder="Add Exercise"
            ref={this.nameRef}
            type="text"
          />
          <datalist id="names">{data}</datalist>
          <input list="parts" placeholder="Body Target" ref={this.bodyRef} />
          <datalist id="parts">{bodyParts}</datalist>
          <button>Add Exercise</button>
        </form>
        {(!this.props.error && this.props.exercises )&&
          this.props.exercises.map(exercise => {
            return (
              <div key={exercise.id}>
                <div onClick={() => <Redirect to={`/${exercise.id}`} />}>
                  {exercise.name}
                </div>
                <Link to={`/${exercise.id}`}>View</Link>
                <button onClick={this.props.deleteExercises(exercise.id)}>
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = ({ exercisesReducer }) => {
  return {
    exercises: exercisesReducer.exercises,
    error: exercisesReducer.error
  };
};

export default connect(
  mapStateToProps,
  { getExercises, deleteExercises, addExercises }
)(Exercises);
