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
import Navbar from "./navbar";
import Form from "./liftsForm";

const Header = styled.div`
  width: 100%;
  height: 70vh;
  background-size: contain;
  background-color: black;
  margin: 0;
  border-radius: 10px 10px 0 0;
`;
const Container = styled.div`
  width: 80%;
  margin: 0 10%;
  display: flex;
  flex-direction: column;
`;
const Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vh;
  width: 60%;
  margin: 0 20%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  transform: translateY(-25vh);
  div {
    width: 50%;
    margin-right: 1%;
    height: 100%;
    background-color: white;
    border-radius: 10px 10px 0 0;
    border-right: 1px solid green;
    &:last-of-type {
      margin-right: 0;
    }
    &:active {
      color: white;
    }
    h3 {
      color: green;
      text-align: center;
    }
    p {
      padding-left: 5%;
      height: 6vh;
    }
  }
`;
const Background = styled.div`
  height: 90%;
  background-color: green;
  background-image: url("https://scontent-lhr3-1.xx.fbcdn.net/v/t31.0-8/26685541_1614242061998871_5397515054910550960_o.jpg?_nc_cat=104&_nc_oc=AQmvuG1JFIhqH7F5T7n2NknryV_ux5R3s1CuvUBZGAHCvZpV_zropGjNH-guyc-MXHQ&_nc_ht=scontent-lhr3-1.xx&oh=b188788ca01ded9768ef944c250e7110&oe=5D792533");
  border-radius: 10px 10px 0 0;
`;

const LiftsSection = styled.div`
  display: flex;
  margin: 0;
  padding-top: 0;
  background-color: black;
  transform: translateY(-34vh);
  min-height: 60vh;
`;
const Button = styled.button`
  text-align: center;
  background-color: green;
  width: 60%;
  margin: 0% 20%;
  font-size: 1em;
  color: white;
  outline: none;
  border: none;
  border-radius: 5px;
  height: 20%;
`;
const Content = styled.div`
  width: 60%;
  margin: 0 20%;
  min-height: 100%;
  background-color: black;
`;

class Exercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addWorkoutOpen: true,
      WorkoutHistoryOpen: false,
      liftsHistoryOpen: false
    };
  }
  componentDidMount() {
    this.props.getExercises();
  }
  openAddWorkout = () => {
    this.setState({
      addWorkoutOpen: true,
      dailyHistoryOpen: false,
      liftsHistoryOpen: false
    });
  };
  openWorkoutHistory = () => {
    this.setState({
      addWorkoutOpen: false,
      dailyHistoryOpen: true,
      liftsHistoryOpen: false
    });
  };
  openLiftsHistory = () => {
    this.setState({
      addWorkoutOpen: false,
      dailyHistoryOpen: false,
      liftsHistoryOpen: true,
    });
  };

  render() {
    return (
      <Container>
        <Navbar />
        <Header>
          <Background />
        </Header>
        <Hero>
          <div onClick ={() => this.openAddWorkout()}>
            <h3>Add Workouts</h3>
            <p>Keep Tracks of workouts as soon as you complete them</p>
            <Button>View</Button>
          </div>
          <div onClick ={() => this.openWorkoutHistory()}>
            <h3>Workouts History</h3>
            <p>Track your progress daily. Compare workouts based on days</p>
            <Button>View</Button>
          </div>
          <div onClick ={() => this.openLiftsHistory()}>
            <h3>Lifts History</h3>
            <p>
              Track your progess on each lifting exercise. Compare workouts
              based on exercises
            </p>
            <Button>View</Button>
          </div>
        </Hero>

        <h2> My Lifts</h2>
        <LiftsSection>
          <Content>
            {this.state.addWorkoutOpen && <Form />}
            {!this.props.error &&
              this.props.exercises &&
              this.props.exercises.map(exercise => {
                return (
                  <div key={exercise.id}>
                    <div onClick={() => <Redirect to={`/${exercise.id}`} />}>
                      {exercise.name}
                      {exercise.bodyRegion}
                    </div>
                    <Link to={`/${exercise.id}`}>View</Link>
                    <button
                      onClick={() => this.props.deleteExercises(exercise.id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
          </Content>
        </LiftsSection>
      </Container>
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
