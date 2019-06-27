import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addExercises ,getExercises
} from "../state/actionCreators";
import { nameArray, targetArray } from "../data";
import decoded from "./decode";

const Form = styled.div`
  border-radius: 10px;
  border:1px solid green;
  width:100%;
  margin-top:10%;
  padding-bottom: 3vh;
  font-family: "Roboto" sans-serif;
  display: flex;
  flex-direction: column;
  h2{
      color:white;
      text-align:center;
      text-shadow: 1px 1px green;
  }div{
      width:100%;
      display:flex;
      border-radius:5px;
  }input{
      width:46%;
      border:1px solid green;
      background-color:inherit;
      outline:none;
      height:4vh;
      border-radius:5px;
      padding:1px 5%;
      margin:2%;
      font-size:1em;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      color:white;
      &::placeholder{
          color:white
      }
  }
`;
const Textarea = styled.textarea`
  width: 90%;
  border-radius:5px;
  margin:2%; 
  border:1px solid green;
  background-color:inherit;
  color:white;
  font-size:1em;
  height: 8vh;
  padding-left:5%;
  padding-top:2%;
  outline:none;
  &::placeholder{
      color:white;
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
     constructor(props){
         super(props)
     }
    componentDidMount() {
        this.props.getExercises();
      }

    createRefs = React.createRef();
    nameRef = this.createRefs;
    bodyRef = this.createRefs;
    userRef = this.createRefs;
    setRef = this.createRefs;
    repsRef = this.createRefs;
    weightsRef = this.createRefs;
    notesRef = this.createRefs;
    add = e => {
      e.preventDefault();
      this.props.addExercises({
        user_id: this.userRef.current.value,
        name: this.nameRef.current.value,
        sets: this.setsRef.current.value,
        weight: this.weightsRef.current.value,
        bodyRegion: this.bodyRef.current.value,
        repsPerSet: this.repsRef.current.value,
        src_url: this.getImage(this.nameRef.current.value),
        created_at: new Date.now(),
        notes: this.notesRef.current.value
      });
      this.nameRef.current.value = "";
      this.bodyRef.current.value = "";
      this.setRef.current.value = "";
      this.repsRef.current.value = "";
      this.weightRef.current.value = "";
    };
  
    getImage = value => {
      const single = value && nameArray.find(name => name.name === value);
      return single.url;
    };
     render(){let data = nameArray.map(exercise => (
        <option key={exercise.name} value={exercise.name} />
      ));
      let bodyParts = targetArray.map(body => <option key={body} value={body} />)

         return (
            <Form onSubmit={this.add}>
            <h2>Add Lifts</h2>
            <div>
          <input
            type="number"
            ref={this.userRef}
            value={decoded().subject}
            hidden
          />
          <input
            list="names"
            placeholder="Add Lifts"
            ref={this.nameRef}
            type="text"
          />
          <datalist id="names">{data}</datalist>
          <input
            list="parts"
            placeholder="Add Body Target"
            ref={this.bodyRef}
          />
          <datalist id="parts">{bodyParts}</datalist>
          </div>
          <div>
          <input type="number" placeholder="Add Sets" ref={this.setsRef} />
          <input type="number" placeholder="Add Reps" ref={this.repsRef} />
          <input
            type="number"
            placeholder="Add Weights"
            ref={this.weightsRef}
          />
          </div>
          <Textarea placeholder="Add Notes" ref={this.commentRefs} />
          <Button>Add </Button>
        </Form>
         )
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
    { getExercises, addExercises }
  )(Formed);
  