import React from "react";
import styled from "styled-components";
import Navbar from "./navbar";
import Form from "./liftsForm";
import WorkoutHistory from "./liftstHistory";
import Progress from "./liftsProgress";
import {getExercises} from '../state/actionCreators'
import {connect} from 'react-redux';
const Header = styled.div`
  width: 100%;
  height: 40vh;
 background-image:url('http://www.driftcentral.com/wp-content/uploads/2015/09/Dark-Grey-Background-Photo-HD-Wallpaper-2nwk9-Free.jpeg');
  margin-top: 0;
  background-size:contain;
  background-color:rgb(33, 33, 33);
  border-radius: 10px 10px 0 0;
  @media(max-width:500px){
    margin-top:12vh;
    margin-bottom:0;
    border-radius:0%;
    height: 40vh;
  }
`;

const Container = styled.div`
  width: 90%;
  margin: 0 5%;
  display: flex;
  flex-direction: column;
  justify-content:space-evenly;
  @media (max-width:500px){
    width:100%;
    margin:0%;
  }
`;
const Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 2% 10%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  @media (max-width:500px){
  width:90%;
  margin:1% 5%;
  height:12vh ;
  }
`;
const Div= styled.div`
    width: 33.3%;
    display:flex;
    flex-direction:column;
    align-items:space-evenly;
    justify-content:center;
    height: 100%;
    padding:0;
    border-radius: 10px 10px 0 0;
    border-right: 1px solid green;
    @media (max-width:500px){
      border-radius:0px;    
    }
    &:hover{
      border-bottom: 2px solid green;
      color:white;
    }
    
    &:last-of-type {
      border-right:none;
    }
    h3 {
      color: green;
      text-align: center;
        @media (max-width:500px){
        font-size:.9em;
      }
    }
    p {
      padding-left: 5%;
      height: 6vh;
      @media (max-width:500px){
        display:none;
      }
    }

  `;
const Background = styled.div`
  height: 100%;
  background-color: green;
  background-image: url("https://scontent-lhr3-1.xx.fbcdn.net/v/t31.0-8/26685541_1614242061998871_5397515054910550960_o.jpg?_nc_cat=104&_nc_oc=AQmvuG1JFIhqH7F5T7n2NknryV_ux5R3s1CuvUBZGAHCvZpV_zropGjNH-guyc-MXHQ&_nc_ht=scontent-lhr3-1.xx&oh=b188788ca01ded9768ef944c250e7110&oe=5D792533");
  border-radius: 10px 10px 0 0;
  @media (max-width:500px){
      border-radius: 0px;}
    
`;

const LiftsSection = styled.div`
  display: flex;
  margin: 0;
  padding-top: 0;
  background-image:url('http://www.driftcentral.com/wp-content/uploads/2015/09/Dark-Grey-Background-Photo-HD-Wallpaper-2nwk9-Free.jpeg');
  background-color:rgb(33, 33, 33);
  @media (max-width:500px){
    min-height:35vh;
    margin:0%;
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
  height: 20%;
`;
const Content = styled.div`
  width: 70%;
  margin: 0 15%;
  min-height:100%;
  @media (max-width:500px){
    width:90%;
    margin: 0 5%;
  }
`;

class Exercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addWorkoutOpen: false,
      WorkoutHistoryOpen: true,
      liftsHistoryOpen: false,
      isEditing:false,
      liftId:'',
      divId:'0',
    };
  }
  componentDidMount(){
    this.props.getExercises();
  }
  openAddWorkout = () => {
    this.setState({
      addWorkoutOpen:true,
      WorkoutHistoryOpen: false,
      liftsHistoryOpen: false,
      isEditing:false,
      liftId:'',
      divId:'2'
    });
  };
openUpdateHistory =(value)=>{
  this.setState({
    addWorkoutOpen: true,
    WorkoutHistoryOpen: false,
    liftsHistoryOpen: false,
    isEditing:true,
    liftId:value,
    divId:'0'
  })
}
  openWorkoutHistory = value => {
    this.setState({
      addWorkoutOpen: false,
      WorkoutHistoryOpen: value,
      liftsHistoryOpen: false,
      isEditing:false,
      liftId:'',
      divId:'0',
    });
  };
  openLiftsHistory = () => {
    this.setState({
      addWorkoutOpen: false,
      WorkoutHistoryOpen: false,
      liftsHistoryOpen: true,
      isEditing:false,
      liftId:null,
      divId:'1',
    });
  };

  render() {

    const Style = (divId) => ({
      backgroundColor: divId === this.state.divId? 'green' :'white' ,
      color: divId === this.state.divId? 'white':'green',})
  
    return (
      <Container>
      <Navbar /> 
        <Header>
          <Background />
        </Header>
        <Hero>
        <Div   style={Style('0')}  onClick={() => this.openWorkoutHistory(true)}>
          <h3 style={Style('0')} >Lifts History</h3>
          <p>Track your progress daily. Compare workouts based on days</p>
        </Div>

        <Div style={Style('1')} onClick={() => this.openLiftsHistory()}>
          <h3 style={Style('1')}>Lifts Progress</h3>
          <p>
            Track your progess on each lifting exercise. Compare workouts
            based on exercises
          </p>
         
        </Div>
        <Div style={Style('2')}  onClick={() => this.openAddWorkout()}>
          <h3  style={Style('2')} >Add Lifts</h3>
          <p>Keep Tracks of workouts as soon as you complete them</p>
          
        </Div>
      </Hero> 
        <LiftsSection>
          <Content>
            {this.state.addWorkoutOpen && (
              <Form added={this.openWorkoutHistory} liftId={this.state.liftId} isEditing={this.state.isEditing}/>
            )}
            {this.state.WorkoutHistoryOpen && <WorkoutHistory  editing ={this.openUpdateHistory}/>}
            {this.state.liftsHistoryOpen && <Progress  editing ={this.openUpdateHistory}/>}
          </Content>
        </LiftsSection>
        
      </Container>
    );
  }
}

export default connect(null,{ getExercises}) (Exercises);
