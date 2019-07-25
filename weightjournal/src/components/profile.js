import React, { Fragment } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import {
  getProfile,
  updateProfile,
  deleteProfile
} from "../state/actionCreators";
import Navbar from "./navbar";

const Container = styled.div`
    margin:20% 5%;
    border-radius:5px;
    border:1px solid green;
    min-height:80vh;
    h1 , h3{
      text-align:center;
    }
    

`;
const ImageDiv = styled.div`
${props =>(props.url ? `background-image: url(${props.url})` : `background-image: url("http://plustraininguk.com/img/logos/avatar.png")`)};
  background-position:center;
  background-size:100%;
  width:50%;
  margin: 5% 25%;
  height:150px;
  border-radius:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  div{
    z-index:+3;
  }

`;
const Image = styled.img`
width:100%;
height:100%;
`
const Button = styled.button`
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
const UploadButton = styled.div`
${props =>(props.check? `display: block` : `display:none`)};
color:green;
text-align:center;
`;
const Div = styled.div `
  display:flex;
  margin:5%;
  p{
    width:95%;
    display:flex;
    justify-content:space-between;
    span{
      width: 80%; display:flex;
    justify-content:center;
    }
  }
  button{
    width:5%
  }
`;


class Profile extends React.Component {
  state = {
    isEditing: false,
    divId: "",
    username: this.props.user.username,
    src_url: this.props.user.src_url,
    age: this.props.user.age,
    height: this.props.user.height,
    weight: this.props.user.weight,
    email: this.props.user.email,
    hovered:false,
  };
  change = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    this.props.getProfile();
  }


  mywidget = window.cloudinary && window.cloudinary.createUploadWidget(
  {
    cloudName: "basilcea",
    uploadPreset: "weightJournal",
    folder: "weightJournal",
    cropping: true
  },
  (error, result) => {
    if (result && result.event === "success") {
      this.setState({
        src_url:result.info.url
      })
    }
  }
);

  getPicturesUrl = () =>{
    this.mywidget.open()
  }
  hovered = () => {
    this.setState({
      hovered:true
    })
  }
  editing = value => {
    this.setState({
      isEditing: true,
      divId: value
    });
  };
  update = (e ,name ,value, user) => {
    e.preventDefault();

    name&& value && this.props.updateProfile({
      username: user  || this.state.username,
      [name] : value 
,
    });
    this.setState({
      divId:null,
      isEditing:false,
    })
  };
  cancel=()=>[
    this.setState({
      divId :null
    })
  ]
  render() {
    return (
      <Fragment>
        <Navbar />
        {!this.props.error && this.props.user && (
          <Container>
          <h1>My Profile</h1>{
          }
          <ImageDiv url={this.state.src_url || this.props.user.src_url } onMouseOver ={() => this.hovered()}>
            <UploadButton check={this.state.hovered} onClick = {() => this.getPicturesUrl()}>Upload</UploadButton>
            </ImageDiv>
            {this.state.divId !== "username" && (
              <h3>
                Name: <span>{this.props.user.username}</span>
                <button onClick={() => this.editing("username")}>Edit</button>
              </h3>
            )}
            {this.state.isEditing && this.state.divId === "username" && (
              <div key="username">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={event => this.change(event)}
                  value={this.state.username}
                />
                <button onClick={e => this.update(e,'username',this.state.username)}>Update</button>
                <button onClick={()=>this.cancel()}>Cancel</button>
              </div>
            )}
            {this.state.divId !== "email" && (
              <Div>
                <p>Email: <span>{this.props.user.email}</span></p>
                <button onClick={() => this.editing("email")}> Edit </button>
              </Div>
            )}
            {this.state.isEditing && this.state.divId === "email" && (
              <Div key="email">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={event => this.change(event)}
                  value={this.state.email}
                />
                <button onClick={e => this.update(e,'email',this.state.email )}>Update</button>
                <button onClick={()=>this.cancel()}>Cancel</button>
              </Div>
            )}
            {this.state.divId !== "height" && (
              <Div>
                <p>Height: <span>{this.props.user.height && `${this.props.user.height} ft`}</span></p>
                <button onClick={() => this.editing("height")}>Edit</button>
        
              </Div>
            )}
            {this.state.isEditing && this.state.divId === "height" && (
              <Div key="height">
                <input
                  type="number"
                  placeholder="Height(in ft)"
                  name="height"
                  onChange={event => this.change(event)}
                  value={this.state.height}
                />
                <button onClick={e => this.update(e, 'height' ,this.state.height)}>Update</button>
                <button onClick={()=>this.cancel()}>Cancel</button>
              </Div>
            )}
            {this.state.divId !== "weight" && (
              <Div>
                <p>Weight: <span>{this.props.user.weight && `${this.props.user.weight} kg`}</span></p>
                <button onClick={() => this.editing("weight")}>Edit</button>
              </Div>
            )}
            {this.state.isEditing && this.state.divId === "weight" && (
              <Div key="height">
                <input
                  type="number"
                  placeholder="Weight (in kg)"
                  name="weight"
                  onChange={event => this.change(event)}
                  value={this.state.weight}
                />{" "}
                <button onClick={e => this.update(e,'weight', this.state.weight)}>Update</button>
                <button onClick={()=>this.cancel()}>Cancel</button>
              </Div>
            )}
            {this.state.divId !== "age" && (
              <Div>
                <p>Age: <span>{this.props.user.age && `${this.props.user.age} years old`}</span> </p>
                <button onClick={() => this.editing("age")}>Edit</button>
              </Div>
            )}
            {this.state.isEditing && this.state.divId === "age" && (
              <Div key="age">
                <input
                  type="number"
                  placeholder="Age:"
                  name="age"
                  onChange={event => this.change(event)}
                  value={this.state.age}
                />
                <button onClick={e => this.update(e,'age' , this.state.age)}>Update</button>
                <button onClick={()=>this.cancel()}>Cancel</button>
              </Div>
            )}

            <Button onClick={() => this.props.deleteProfile()}>
              Delete Account
            </Button>
          </Container>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = ({ userReducer }) => {
  return {
    user: userReducer.user,
    error: userReducer.error
  };
};
export default connect(
  mapStateToProps,
  { getProfile, updateProfile, deleteProfile }
)(Profile);
