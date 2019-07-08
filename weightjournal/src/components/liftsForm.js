import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  addExercises,
  getExercises,
  updateExercises
} from "../state/actionCreators";
import { nameArray, targetArray } from "../data";
import decoded from "./decode";

const Form = styled.form`
  width: 80%;
  margin: 10%;
  border-radius: 10px;
  border: 1px solid green;
  background-image: url("http://www.driftcentral.com/wp-content/uploads/2015/09/Dark-Grey-Background-Photo-HD-Wallpaper-2nwk9-Free.jpeg");
  padding-bottom: 3vh;
  font-family: "Roboto" sans-serif;
  display: flex;
  flex-direction: column;
  @media (max-width:500px){
    width:100%;
    margin:10% 0%
  }
  h2 {
    color: white;
    text-align: center;
    text-shadow: 1px 1px green;
  }
  div {
    width: 100%;
    display: flex;
    border-radius: 5px;
  }
  input {
    width: 46%;
    border: 1px solid green;
    background-color: inherit;
    outline: none;
    height: 4vh;
    border-radius: 5px;
    padding: 1px 5%;
    margin: 2%;
    font-size: 1em;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
    color: white;
    &::placeholder {
      color: white;
    }
    @media(max-width:500px){
      font-size:.6em;
    }
  }
  input[type="number"] {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;
const Textarea = styled.textarea`
  width: 90%;
  border-radius: 5px;
  margin: 2%;
  border: 1px solid green;
  background-color: inherit;
  color: white;
  resize: none;
  font-size: 1em;
  height: 8vh;
  padding-left: 5%;
  padding-top: 2%;
  outline: none;
  &::placeholder {
    color: white;
  }
  @media(max-width:500px){
      font-size:.6em;
    }
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
  height: 3vh;
`;
class Formed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      sets: "",
      weight: "",
      bodyRegion: "",
      repsPerSet: "",
      src_url: "",
      text: "Add Lifts",
      action: "Add",
      value: this.add
    };
  }
  componentDidMount() {
    this.props.getExercises();
  }
  componentWillReceiveProps(np) {
    if (np.isEditing) {
      const exercise = np.exercises.find(
        lift => lift.id === Number(this.props.liftId)
      );
      exercise &&
        this.setState({
          name: exercise.name,
          sets: exercise.sets,
          weight: exercise.weight,
          bodyRegion: exercise.bodyRegion,
          repsPerSet: exercise.repsPerSet,
          notes: exercise.notes,
          src_url: exercise.src_url,
          text: "Update My Lifts",
          action: "Update",
          value: this.update
        });
    } else {
      this.setState({
        name: "",
        sets: "",
        weight: "",
        bodyRegion: "",
        repsPerSet: "",
        src_url: "",
        notes: "",
        text: "Add Lifts",
        action: "Add",
        value: this.add
      });
    }
  }
  change = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  update = e => {
    e.preventDefault();
    this.props.updateExercises(this.props.liftId, {
      user_id:decoded().subject,
      name: this.state.name,
      sets: this.state.sets,
      weight: this.state.weight,
      bodyRegion: this.state.bodyRegion,
      repsPerSet: this.state.repsPerSet,
      src_url: this.getImage(this.state.name),
      notes: this.state.notes
    });
    !this.props.errors && this.props.added(true);
  };
  add = e => {
    e.preventDefault();
    const data ={
      user_id:decoded().subject,
      name: this.state.name,
      sets: this.state.sets,
      weight: this.state.weight,
      bodyRegion: this.state.bodyRegion,
      repsPerSet: this.state.repsPerSet,
      src_url: this.getImage(this.state.name),
      notes: this.state.notes
    }
    this.props.addExercises(data);
    !this.props.error && this.props.added(true);
  };

  getImage = value => {
    const single = value && nameArray.find(name => name.name === value);
    return single ? single.url : 'htpps://';
  };
  render() {
    let data = nameArray.map(exercise => (
      <option key={exercise.name} value={exercise.name} />
    ));
    let bodyParts = targetArray.map(body => <option key={body} value={body} />);

    return (
      <Form onSubmit={e => this.state.value(e)}>
        <h2>{this.state.text}</h2>
        <div>
          <input
            name="name"
            list="names"
            placeholder="Add Lifts"
            value={this.state.name}
            onChange={event => this.change(event)}
            type="text"
          />
          <datalist id="names">{data}</datalist>
          <input
            name="bodyRegion"
            list="parts"
            placeholder="Add Body Target"
            onChange={event => this.change(event)}
            value={this.state.bodyRegion}
          />
          <datalist id="parts">{bodyParts}</datalist>
        </div>
        <div>
          <input
            name="sets"
            value={this.state.sets}
            type="number"
            placeholder="Add Sets"
            onChange={event => this.change(event)}
          />
          <input
            name="repsPerSet"
            value={this.state.repsPerSet}
            type="number"
            placeholder="Add Reps"
            onChange={event => this.change(event)}
          />
          <input
            type="number"
            name="weight"
            value={this.state.weight}
            placeholder="Add Weights"
            onChange={event => this.change(event)}
          />
        </div>
        <Textarea
          name="notes"
          placeholder="Add Notes"
          value={this.state.notes}
          onChange={event => this.change(event)}
        />
        <Button>{this.state.action} </Button>
      </Form>
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
  { getExercises, addExercises, updateExercises }
)(Formed);
