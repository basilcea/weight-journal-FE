import React from 'react';
import {connect} from 'react-redux';
import {getExercise, getExercises, deleteExercises} from '../state/actionCreators';
import styled from 'styled-components';
import moment from 'moment';
 const Div = styled.div`
    color:white;
 `;

// const Details = styled.div`
// ${props => (props.srcUrl ? `width: 47%` : `width: 100%`)};
// ${props => (props.srcUrl ? `margin: 0%` : `margin: 0% 10%`)};
// ${props => (props.srcUrl ? `border:none` : `border:2px solid green`)};
// ${props => (props.srcUrl ? `border:none`:`border-radius: 10px`)};
// ${props => (props.srcUrl ? `box-shadow:none`:`box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) `)};
// padding:1% 5%;
// div {
//   display: flex;
//   justify-content: space-between;
//   flex-direction: row;
// }
// h3 {
//   margin-bottom: 2px;
// }
// `;
const Image = styled.img`
    width:100%;
    background-repeat:no-repeat;
    margin-top:2%;
    border-radius:5px 5px 0 0;
`
const ViewButton = styled.button`
${props => (props.check? `display: none` : `display: block`)};
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
// const Moment =(value) => moment(value).calendar()
// const Header = styled.div`
// display: flex;
// justify-content: space-between;
// align-items: center;
// padding: 0;
// flex-wrap: wrap;
// `;
// const Actions = styled.div`
// display: flex;
// justify-content: center;
// align-items:flex-end;
// width: 100%;
// height:42%;
// margin:2% 0%;
// button  {
//   width: 50%;
//   box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
//     0 6px 20px 0 rgba(0, 0, 0, 0.19);
// }

// `;
// const Newspan = styled.div`
// width: 50%;
// `;

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
    closeLiftDetails=(divId)=>{
        this.setState({
            isView:false,
            id: divId
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
        {newObject && newObject.map(lift => 
            <div key={lift.name}>
            <Image src={lift.url} alt=''/>
            <p>{lift.name}</p>
            <ViewButton check={lift.name === this.state.id} onClick ={() =>this.getLiftDetails( lift.name)}>View</ViewButton>
            {this.state.isView && this.state.id === lift.name && 
                <button onClick ={() =>this.closeLiftDetails(lift.name)}>Close</button>
            }
            <div>
            {this.state.isView && this.state.id === lift.name && this.props.exercise && this.props.exercise.map(exercise => 
                <div key={exercise.id}>
                <p>{this.Moment(exercise.created_at)}</p>
                <p>Target Region: {exercise.bodyRegion}</p>
                <p>Sets: {exercise.sets} Sets</p>
                <p>Reps: {exercise.repsPerSet} Reps</p>
                <p>Weight Lifted: {exercise.weight} Kg</p>
                <button onClick= {()=>this.props.editing(exercise.id)}>Edit</button>
                <button onClick = {() => this.props.deleteExercises(exercise.id)}>Delete</button>
                </div>)}
            
            </div>
            </div>
            ) }
            {newObject && newObject.length === 0 && (
                <div>
                  <h3>No Lifts</h3>
                  <p>Click Add Lifts above and get started</p>
                </div>
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