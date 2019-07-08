import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  getProfile,
  updateProfile,
  deleteProfile
} from "../state/actionCreators";
import Navbar from "./navbar";


class Profile extends React.Component {
  state = {
    isEditing: false,
    divId: "",
    username: this.props.user.username,
    src_url: this.props.user.src_url,
    age: this.props.user.age,
    height: this.props.user.height,
    weight: this.props.user.weight,
    email: this.props.user.email
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
          <div>
            <img
              src={
                this.state.src_url || this.props.user.src_url ||
                "http://plustraininguk.com/img/logos/avatar.png"
              }
              alt=""
            />
            <button onClick = {() => this.getPicturesUrl()}>Upload</button>
            {this.state.divId !== "username" && (
              <h1>
          
                Name: {this.props.user.username}{" "}
                <button onClick={() => this.editing("username")}>Edit</button>
              </h1>
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
              <p>
                Email: {this.props.user.email}
                <button onClick={() => this.editing("email")}> Edit </button>
              </p>
            )}
            {this.state.isEditing && this.state.divId === "email" && (
              <div key="email">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={event => this.change(event)}
                  value={this.state.email}
                />
                <button onClick={e => this.update(e,'email',this.state.email )}>Update</button>
                <button onClick={()=>this.cancel()}>Cancel</button>
              </div>
            )}
            {this.state.divId !== "height" && (
              <p>
                Height: {this.props.user.height} ft
                <button onClick={() => this.editing("height")}>Edit</button>
        
              </p>
            )}
            {this.state.isEditing && this.state.divId === "height" && (
              <div key="height">
                <input
                  type="number"
                  placeholder="Height(in ft)"
                  name="height"
                  onChange={event => this.change(event)}
                  value={this.state.height}
                />
                <button onClick={e => this.update(e, 'height' ,this.state.height)}>Update</button>
                <button onClick={()=>this.cancel()}>Cancel</button>
              </div>
            )}
            {this.state.divId !== "weight" && (
              <p>
                Weight: {this.props.user.weight} kg
                <button onClick={() => this.editing("weight")}>Edit</button>
              </p>
            )}
            {this.state.isEditing && this.state.divId === "weight" && (
              <div key="height">
                <input
                  type="number"
                  placeholder="Weight (in kg)"
                  name="weight"
                  onChange={event => this.change(event)}
                  value={this.state.weight}
                />{" "}
                <button onClick={e => this.update(e,'weight', this.state.weight)}>Update</button>
                <button onClick={()=>this.cancel()}>Cancel</button>
              </div>
            )}
            {this.state.divId !== "age" && (
              <p>
                Age: {this.props.user.age} years old
                <button onClick={() => this.editing("age")}>Edit</button>
              </p>
            )}
            {this.state.isEditing && this.state.divId === "age" && (
              <div key="age">
                <input
                  type="number"
                  placeholder="Age:"
                  name="age"
                  onChange={event => this.change(event)}
                  value={this.state.age}
                />
                <button onClick={e => this.update(e,'age' , this.state.age)}>Update</button>
                <button onClick={()=>this.cancel()}>Cancel</button>
              </div>
            )}

            <button onClick={() => this.props.deleteProfile()}>
              Delete Account
            </button>
          </div>
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
