import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment';
import decode from "./decode";
import {
  getExercises,
  deleteExercises,
  addExercises
} from "../state/actionCreators";
const History = styled.div`
  min-height: 100%;
  margin-top: 10%;
 hr {
   color:black;
   font-size:2px
 }
  h2 {
    text-align: center;
    color: white;
    font-size: 2em;
    text-shadow: 2px 2px solid black;
  }
`;
const HistoryFound = styled.div`
  color: white;
  display: flex;
  outline: none;
  margin: 5% 0%;
  border-radius: 10px;
  min-height:30vh;
  justify-content:space-between;
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
  h3 {
    color: green;
    text-align: center;
    font-size: 2rem;
  }
  p{
    color:white;
    text-align:center;
    font-size:1.5em;
  }
`;
const Image = styled.img`
  min-height: 100%;
  width: 47%;
  border-radius:0%;
`;
const Details = styled.div`
  ${props => (props.srcUrl ? `width: 47%` : `width: 100%`)};
  ${props => (props.srcUrl ? `margin: 0%` : `margin: 0% 10%`)};
  ${props => (props.srcUrl ? `border:none` : `border:2px solid green`)};
  ${props => (props.srcUrl ? `border:none`:`border-radius: 10px`)};
  ${props => (props.srcUrl ? `box-shadow:none`:`box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) `)};
  padding:1% 5%;
  div {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  h3 {
    margin-bottom: 2px;
  }
`;
const Button = styled.button`
  width: 100%;
  margin-right: 2%;
  margin-top: 2%;
  background-color: green;
  padding: 0% 5%;
  border-radius: 5px 5px 0px 0px;
  outline: none;
  height: 4vh;
  font-size: 1em;
  color: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    background-color: black;
  }
`;
const Moment =(value) => moment(value).calendar()
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  flex-wrap: wrap;
`;
const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items:flex-end;
  width: 100%;
  height:42%;
  margin:2% 0%;
  button  {
    width: 50%;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

`;
const Newspan = styled.div`
  width: 50%;
`;
const Exercises = props => {
  useEffect(() => {
    props.getExercises(decode().subject);
  }, []);
  console.log(props.exercises)
const sortedExercises = props.exercises && props.exercises.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  return (
    <History>
      <h2>Lifts History</h2>
      <hr/>
           {props.exercises && !props.error && sortedExercises.map(exercise => (
          <HistoryFound key={exercise.id}>
          {exercise.src_url && <Image src={exercise.src_url} alt="" />}
            <Details srcUrl={exercise.src_url}>
              <Header>
                <h3>
                  <span>Lift: </span>
                  {exercise.name}
                </h3>
                <Newspan>{Moment(exercise.created_at)}</Newspan>
              </Header>
              <div>
                <span>
                  <h3>Target Region:</h3>
                </span>{" "}
                <Newspan>{exercise.bodyRegion}</Newspan>
              </div>
              <div>
                <span>
                  <h3>Set:</h3>
                </span>{" "}
                <Newspan>{exercise.sets} Sets</Newspan>
              </div>
              <div>
                <span>
                  <h3>Reps Per Set:</h3>{" "}
                </span>
                <Newspan>{exercise.repsPerSet} Reps</Newspan>
              </div>
              <div>
                <span>
                  <h3>Weights Lifted:</h3>
                </span>{" "}
                <Newspan>{exercise.weight} Kg</Newspan>
              </div>
              <div>
                <span>
                  <h3>Notes:</h3>
                </span>{" "}
                <Newspan>{exercise.notes}</Newspan>
              </div>
              <Actions>
                <Button onClick={() => props.editing(exercise.id)}> Edit </Button>
                <Button onClick={() => props.deleteExercises(decode().subject,exercise.id)}>
                  Delete
                </Button>
              </Actions>
            </Details>
          </HistoryFound>
        ))}
      {props.exercises && props.exercises.length === 0 && (
        <HistoryError>
          <h3>No Lifts</h3>
          <p>Click Add Lifts above and get started</p>
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
