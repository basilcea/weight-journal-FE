import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import moment from "moment";
import {
  getExercises,
  deleteExercises,
  addExercises
} from "../state/actionCreators";
const History = styled.div`
  min-height: 88%;
  margin-top: 10%;
  hr {
    color: black;
    font-size: 2px;
  }
  h2 {
    text-align: center;
    color: white;
    font-size: 2em;
    text-shadow: 2px 2px solid black;
    @media (max-width: 500px) {
      font-size: 1.2em;
    }
  }
`;
const HistoryFound = styled.div`
  color: white;
  display: flex;
  outline: none;
  margin: 5% 0%;
  border-radius: 10px;
  border: 1px solid green;
  min-height: 30vh;
  width: 100%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
  }
  span {
    color: green;
    font-size: 1em;
    margin-bottom: 1%;
    width: 60%;
    @media (max-width: 500px) {
      width: 100%;
    }
  }
  h3 {
    display: inline-block;
    margin: 0;
    @media (max-width: 500px) {
      font-size: 0.9em;
    }
  }
`;
const HistoryError = styled.div`
  h3 {
    color: green;
    text-align: center;
    font-size: 2rem;
  }
  p {
    color: white;
    text-align: center;
    font-size: 1.5em;
  }
`;
const Image = styled.img`
  min-height: 100%;
  width: 47%;
  border-radius: 0%;
  @media (max-width: 500px) {
    width: 100%;
  }
`;
const Details = styled.div`
  padding: 1% 5%;
  width: 50%;
  @media (max-width: 500px) {
    margin: 0%;
    border: none;
    width: 100%;
  }
  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1%;
    @media (max-width: 500px) {
    }
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
  @media (max-width: 500px) {
    font-size: 0.8em;
  }
`;
const Moment = value => moment(value).calendar();
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;
const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: nowrap;
  width: 100%;
  margin: 2% 0%;
  button {
    width: 48%;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
const Newspan = styled.div`
  width: 50%;
  flex-direction: row;
  ${props => (props.check ? `color:grey` : `color:white`)}
  @media (max-width:500px) {
    font-size: 1em;
  }
`;
const Exercises = props => {
  useEffect(() => {
    props.getExercises();
  }, []);
  const sortedExercises =
    props.exercises &&
    props.exercises.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  return (
    <History>
      <h2>Lifts History</h2>
      <hr />
      {props.exercises &&
        !props.error &&
        sortedExercises.map(exercise => (
          <HistoryFound key={exercise.id}>
            {exercise.src_url && <Image src={exercise.src_url} alt="" />}
            <Details srcUrl={exercise.src_url}>
              <div>
                <span>
                  {" "}
                  <h3> Lift: {exercise.name}</h3> 
                </span>

                <Newspan check="date">{Moment(exercise.created_at)}</Newspan>
              </div>
              <div>
                <span>
                  <h3>Target Region:</h3>
                </span>{" "}
                <Newspan>{exercise.bodyRegion}</Newspan>
              </div>
              <div>
                <span>
                  <h3>Sets:</h3>
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
                <Button onClick={() => props.editing(exercise.id)}>
                  {" "}
                  Edit{" "}
                </Button>
                <Button onClick={() => props.deleteExercises(exercise.id)}>
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
