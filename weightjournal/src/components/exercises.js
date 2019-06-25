import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getExercises , deleteExercises , addExercises } from "../state/actionCreators";
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom'
class Exercises extends React.Component {
  componentDidMount() {
    this.props.getExercises();
  }
  nameRef = React.createRef();

  add = (e) =>{
      e.preventDefault()
      this.props.addExercises(this.nameRef.current.value)
      this.nameRef.current.value =''
  }
  render() {
    return (
      <div>
        <h2> My Lifts</h2>
        <form onSubmit={this.add}>
        <input placeholder='Add Exercise' ref = {this.nameRef} type='text'/>
        <button>Add Exercise</button>
        </form>
        {!this.props.error && this.props.exercises.map(exercise => {
          return(<div key={exercise.id} >
            <div onClick ={() => <Redirect to ={`/${exercise.id}`}/>}>{exercise.name}</div>
            <Link to={`/${exercise.id}`}>View</Link>
            <button onClick={this.props.deleteExercises(exercise.id)}>Delete</button>
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

const mapStateToProps = ({exercisesReducer}) => {
  return {
    exercises: exercisesReducer.exercises,
    error: exercisesReducer.error
  };
};

export default connect(
  mapStateToProps,
  { getExercises , deleteExercises , addExercises}
)(Exercises);
