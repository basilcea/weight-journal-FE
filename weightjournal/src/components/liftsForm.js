import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addExercises ,getExercises ,updateExercises,
} from "../state/actionCreators"
import { nameArray, targetArray } from "../data";
import decoded from "./decode";


const Div = styled.div`
width:100%;
    ${props => ( props.url && `min-height: 100vh` )};
    ${props => ( props.url && `display: flex` )};
    ${props => ( props.url && `justify-content: center` )};
    ${props => ( props.url && `align-items:center` )};
    ${props => ( props.url && `background-position:center` )};
    ${props => ( props.url && `background-size:cover` )};
    ${props => ( props.url && `background-image:url('https://wallpaperplay.com/walls/full/7/b/5/32717.jpg') `)};

`; 
const Form = styled.form`
   ${props => ( props.url ? `width: 50%` : `width: 100%`)};
   ${props => ( props.url ? `margin-top: 0%` : `margin-top: 10%`)};
  border-radius: 10px;
  border:1px solid green;
  background-image:url('http://www.driftcentral.com/wp-content/uploads/2015/09/Dark-Grey-Background-Photo-HD-Wallpaper-2nwk9-Free.jpeg');
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
  input[type= number]{
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button{
      -webkit-appearance: none; 
  margin: 0; 
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
  resize:none;
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
    this.state =({
        user_id:decoded().subject,
        name: '',
        sets:'',
        weight: '',
        bodyRegion: '',
        repsPerSet: '',
        src_url:'',
        text:'Add Lifts',
        action:'Add',
        value:this.add
    })
}
    componentDidMount() {

        this.props.getExercises();
        if (
            this.props.location &&
            this.props.location.pathname ===
              `/update/${this.props.match.params.id}`
          ) {
              const exercise = this.props.exercises.find(
                lift => lift.id === Number(this.props.match.params.id)
              )
              exercise && this.setState({
                user_id:decoded().subject,
                name: exercise.name,
                sets:exercise.sets,
                weight: exercise.weight,
                bodyRegion: exercise.bodyRegion,
                repsPerSet: exercise.repsPerSet,
                notes:exercise.notes,
                src_url:exercise.src_url,
                text:'Update My Lifts',
                action:'Update',
                value:this.update  
              })
          }
      } 
      added=value => value
      change = event => {
        this.setState({ [event.target.name]: event.target.value });
    }


    update = e => {
        e.preventDefault();
      this.props.updateExercises(this.props.match.params.id,{
        user_id: decoded().subject,
        name: this.state.name,
        sets: this.state.sets,
        weight: this.state.weight,
        bodyRegion: this.state.bodyRegion,
        repsPerSet: this.state.repsPerSet,
        src_url: this.getImage(this.state.name),
        notes: this.state.notes
      });
      !this.props.errors && this.props.history.push({pathname:`/`})
    };
    add = e => {
      e.preventDefault();
      this.props.addExercises({
        user_id: decoded().subject,
        name: this.state.name,
        sets: this.state.sets,
        weight: this.state.weight,
        bodyRegion: this.state.bodyRegion,
        repsPerSet: this.state.repsPerSet,
        src_url: this.getImage(this.state.name),
        notes: this.state.notes
      });
      !this.props.error && this.props.added(true)
    };
  
    getImage = value => {
      const single = value && nameArray.find(name => name.name === value);
      return single ? single.url : null;
    };
     render(){let data = nameArray.map(exercise => (
        <option key={exercise.name} value={exercise.name} />
      ));
      let bodyParts = targetArray.map(body => <option key={body} value={body} />)

         return (
            <Div url={this.props.location}><Form url={this.props.location} onSubmit={e => this.state.value(e)}>
            <h2>{this.state.text}</h2>
            <div>
          <input

          name='name'
            list="names"
            placeholder="Add Lifts"
            value={this.state.name}
            onChange={event => this.change(event)}
            type="text"
          />
          <datalist id="names">{data}</datalist>
          <input
          name='bodyRegion'
            list="parts"
            placeholder="Add Body Target"
            onChange={event => this.change(event)}
           value={this.state.bodyRegion}
          />
          <datalist id="parts">{bodyParts}</datalist>
          </div>
          <div>
          <input name='sets' value={this.state.sets} type="number" placeholder="Add Sets"   onChange={event => this.change(event)}  />
          <input name='repsPerSet' value={this.state.repsRepSet}type="number" placeholder="Add Reps" ref={this.repsRef}   onChange={event => this.change(event)}/>
          <input
            type="number"
            placeholder="Add Weights"
            ref={this.weightsRef}
          />
          </div>
          <Textarea name='notes' placeholder="Add Notes" value={this.state.notes}   onChange={event => this.change(event)}/>
          <Button>{this.state.action} </Button>
        </Form>
        </Div>

         )
     }
 }

 const mapStateToProps = ({ exercisesReducer, exerciseReducer }) => {
    return {
      exercises: exercisesReducer.exercises,
      error: exercisesReducer.error,
    };
  };
  
  export default connect(
    mapStateToProps,
    { getExercises, addExercises , updateExercises }
  )(Formed);
  