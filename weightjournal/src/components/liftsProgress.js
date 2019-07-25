import React from 'react';
import {connect} from 'react-redux';
import {getExercise, getExercises, deleteExercises} from '../state/actionCreators';
import styled from 'styled-components';
import moment from 'moment';
 const Div = styled.div`
   min-height: 88%;
  margin-top: 10%;
    color:white;
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
const Image = styled.img`
    width:100%;
    background-repeat:no-repeat;
    margin-top:2%;
    border-radius:5px 5px 0 0;
`
const ViewButton = styled.button`
${props => (props.check? `display: none` : `display: block`)};
width: 50%;
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
const Heading = styled.div`
display:flex;
justify-content:space-between;
h3{
    width:50%;
}
`;
const DetailsContainer = styled.div`
    width:100%;
    margin-top:5%;
    display:flex;
`;
const Details = styled.div`
    display:flex;
    flex-direction:column;
    width:70%;
    span{
        color:green;

    }
    p{
        padding:1% 0%;
    }
`;
const Lift = styled.div `
    border:1px solid green;
    border-radius:10px;
    margin:5% 0%;
    padding: 5%;

`;
const Actions = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:20%;
`;
const HistoryError = styled.div`
  h3 {
    color: green;
    text-align: center;
    font-size: 2rem;
    padding-top:5%;
    @media (max-width:500px){
      font-size:1rem;
    }
  }
  p {
    color: white;
    text-align: center;
    font-size: 1.5em;
    @media (max-width:500px){
      font-size:1rem;
    }
  }
`;
const ActionButton = styled.div`
width: 100%;
margin-right: 2%;
margin: 2% 0;
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

class Progress extends React.Component{
    constructor(props){
        super(props)
        this.state=({
            isView:false,
            id:null
        })
    }
  
    getLiftDetails = (name) => {
        this.props.getExercise(name)
        this.setState({
            isView:true,
            id: name
        })
        
    }
    closeLiftDetails=()=>{
        this.setState({
            isView:false,
            id: ''
        })
    }
    Moment =(value) => moment(value).calendar()


    render(){
        const newArray=this.props.exercises.map(exercise => exercise.name)
        const allLifts = [...new Set(newArray)]
        const lifted = allLifts.map(lift => this.props.exercises.find(exercise => exercise.name === lift))
        const newObject= lifted.map(lift => ({name:lift.name , url:lift.src_url}))
    return(
        <Div>
        <h2>Lifts Progress</h2>
        <hr />
        {newObject && newObject.map(lift => 
            <Lift key={lift.name}>
            <Image src={lift.url} alt=''/>
            <Heading>  
            <h3>{lift.name.toUpperCase()}</h3>
            <ViewButton check={lift.name === this.state.id} onClick ={() =>this.getLiftDetails(lift.name)}>View</ViewButton>
            {this.state.isView && this.state.id === lift.name && <ViewButton onClick ={() =>this.closeLiftDetails()}>Close</ViewButton>}
            </Heading>
            <div>
            {this.state.isView && this.state.id === lift.name && this.props.exercise && this.props.exercise.map(exercise => 
                <DetailsContainer key={exercise.id}>
                <Details>
                <p style={{color:'grey'}}>{this.Moment(exercise.created_at)}</p>
                <p><span>Target Region:</span>{exercise.bodyRegion}</p>
                <p><span>Sets:</span> {exercise.sets} Sets</p>
                <p><span>Reps:</span> {exercise.repsPerSet} Reps</p>
                <p><span>Weight Lifted:</span> {exercise.weight} Kg</p>
                </Details>
                <Actions>
                <ActionButton onClick= {()=>this.props.editing(exercise.id)}>Edit</ActionButton>
                <ActionButton onClick = {() => this.props.deleteExercises(exercise.id)}>Delete</ActionButton>
                </Actions>
             
                </DetailsContainer>)}
            
            </div>
            </Lift>
            ) }
            {newObject && newObject.length === 0 && (
                <HistoryError>
                  <h3>No Lifts</h3>
                  <p>Click Add Lifts above and get started</p>
                </HistoryError>
              )}


        </Div>
    )
}
}
export const mapStateToProps = ({exercisesReducer, exerciseReducer}) =>{
    return({
        exercises:exercisesReducer.exercises,
        exercise:exerciseReducer.exercise
     })
}

export default connect(mapStateToProps,{getExercises, getExercise, deleteExercises})(Progress)