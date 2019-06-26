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
import Decode from "jwt-decode";

class Exercises extends React.Component {
  componentDidMount() {
    this.props.getExercises();
  }
  nameRef = React.createRef();
  bodyRef = React.createRef();
  userRef = React.createRef();
  //   this.getImage(this.nameRef.current.value)
  add = e => {
    e.preventDefault();
    this.props.addExercises({
      "user_id": this.userRef.current.value,
      "name": this.nameRef.current.value,
      "body_region": this.bodyRef.current.value,
      "src_url": this.getImage(this.nameRef.current.value)
    });
    this.nameRef.current.value = "";
    this.bodyRef.current.value = "";
  };
  decoded = token => {
    const info = Decode(token);
    return info;
  };
  getImage = value => {
    const single = value && nameArray.find(name => name.name === value);
    return single.url;
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
            type="number"
            ref={this.userRef}
            value={this.decoded(localStorage.getItem("token")).subject}
            hidden
          />
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
        {!this.props.error &&
          this.props.exercises &&
          this.props.exercises.map(exercise => {
            return (
              <div key={exercise.id}>
                <div onClick={() => <Redirect to={`/${exercise.id}`} />}>
                  {exercise.name}
                </div>
                <Link to={`/${exercise.id}`}>View</Link>
                <button onClick={() => this.props.deleteExercises(exercise.id)}>
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
