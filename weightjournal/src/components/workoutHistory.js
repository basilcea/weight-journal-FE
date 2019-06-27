import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import updateForm from "./liftsForm";
import mine from "./mine.png";
import {
  getExercises,
  deleteExercises,
  addExercises
} from "../state/actionCreators";
const History = styled.div`
  min-height: 100%;
  margin-top: 10%;
`;
const HistoryFound = styled.div`
  color: white;
  display: flex;
  border: 2px solid green;
  outline: none;
  border-radius: 10px;
  box-shadow: 0 3px 8px 0 white, 0 3px 10px 0 green;
  span {
    color: green;
    font-size: 1em;
  }
  h3 {
    display: inline-block;
    margin: 0;
  }
`;
const HistoryError = styled.div`
h3{
  color:white;
  text-align:center;
  font-size:2rem;
}
`;
const Image = styled.img`
  max-height: 300px;
  width: 50%;
`;
const Details = styled.div`
width:47%;
  padding-top: 5%;
  padding-right:3%;
`;
const Button = styled.button`
  width: 100%;
  margin-right:2%;
  margin-top:2%;
  background-color: green;
  padding: 0% 5%;
  border-radius: 5px 5px 0px 0px;
  outline:none;
  height:4vh;
  font-size:1em;
  color:white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
&:hover{
    background-color:black;
}`;
const Header = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0;
  flex-wrap:wrap;
  h3{
    margin:0
  }
`;
const Actions = styled.div `
display:flex;
justify-content:center;
width:100%;
button{
width:50%
}
`
const Exercises = props => {
  useEffect(() => {
    props.getExercises();
  }, []);
  const exercise = {
    src_url: mine,
    user_id: 1,
    name: "Deadlift",
    sets: 3,
    weight: 110,
    repsPerSet: 5,
    bodyRegion: "glutes, quads, trapezius",
    notes: "was only able to perform 3 reps on my second set",
    created_at:'2019-06-24 11:23:00',
    notes:'vfknnkn,nm,nmnknjnjmbjbjnjnmbhbjnjbnghbvhbb  jbhbvhvvgcfcfc'
  };
  return (
    <History>
     { !props.error &&
    props.exercises &&
  props.exercises.map(exercise => (
      <HistoryFound
        key={exercise.user_id + exercise.created_at + exercise.name}
      >
        <Image src={exercise.src_url} alt="" />
        <Details>
          <Header>
            <h3>
              <span>Lift: </span>
              {exercise.name}
            </h3>
            <p>{exercise.created_at}</p>
          </Header>
          <p>
            <span>
              <h3>Target Region:</h3>
            </span>{" "}
            {exercise.bodyRegion}
          </p>
          <p>
            <span>
              <h3>Set:</h3>
            </span>{" "}
            {exercise.sets} Sets
          </p>
          <p>
            <span>
              <h3>Reps Per Set:</h3>{" "}
            </span>
            {exercise.repsPerSet} Reps
          </p>
          <p>
            <span>
              <h3>Weights Lifted:</h3>
            </span>{" "}
            {exercise.weight} Kg
          </p>
          <p>
            <span>
              <h3>Notes:</h3>
            </span>{" "}
            {exercise.notes}
          </p>
          <Actions>
          <Button
            onClick={() => this.props.updateExercise(exercise.id, this.data)}
          >
            Edit{" "}
          </Button>
          <Button onClick={() => this.props.deleteExercises(exercise.id)}>
            Delete
          </Button>
         </Actions>
        </Details>
      </HistoryFound>
  ))}
      {props.error && (
        <HistoryError>
          <h3>Yet to Lift</h3>
          <Button>Add Workout</Button>
        </HistoryError>
      )}
    </History>
  );
};

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
