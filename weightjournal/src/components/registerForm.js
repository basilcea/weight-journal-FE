import React from "react";
import uploader from "./upload";
import { register, updateProfile, getProfile } from "../state/actionCreators";
import { connect } from "react-redux";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      height: "",
      weight: "",
      email: "",
      text: "Register on Lifted",
      action: "Register",
      src: this.imagesrc,
      value: this.registerUser,
      pass: "",
      confirmPword: ""
    };
  }
  imagesrc;
  componentDidMount() {
    if (
      this.props.location &&
      this.props.location.pathname ===
        `/users/update/${this.props.match.params.id}`
    ) {
      const user = this.props.getProfile(this.props.match.params.id).user;
      user &&
        this.setState({
          username: user.name,
          age: user.age,
          height: user.height,
          weight: user.weight,
          text: "Update Profile",
          email: user.email,
          src: user.src,
          action: "Update",
          value: this.updateUser,
          pass: ""
        });
    }
  }
  change = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  updateUser = e => {
    e.preventDefault();
    this.props.updateProfile(this.props.match.params.id, this.state);
    this.props.history.push({
      pathname: `/users/${this.props.match.params.id}`
    });
  };

  uploadPicture = () => {
    uploader(this.getPicture).open();
  };

  getPicture = value => {
    this.imagesrc = value.info.url;
    return this.imagesrc;
  };

  registerUser = event => {
    event.preventDefault();
    if(this.state.pass === this.state.confirmPword){
      this.props.register({
          "username" :this.state.username, 
          "password":this.state.pass}
    );
      }
  };
  render() {
    return (
      <div>
        {this.state.text}
        <form onSubmit={e => this.state.value(e)}>
          <input
            type="text"
            name='username'
            value={this.state.username}
            onChange={e => this.change(e)}
            placeholder="Username"
            required
          />
          {!this.props.registering && <div>
            <div>
            <button onClick={this.uploadPicture}>Upload Picture </button>
            <img src={this.state.src} alt="" />
            </div>
          <input
            type="email"
            name='email'
            value={this.state.email}
            onChange={e => this.change(e)}
            placeholder="Email"
          />
          <input
            type="text"
            name='age'
            value={this.state.age}
            onChange={e => this.change(e)}
            placeholder="Age"
          />
          <input
            type="number"
            name='height'
            value={this.state.height}
            onChange={e => this.change(e)}
            placeholder="Height(in Ft)"
          />
          <input
            type="number"
            name='weight'
            value={this.state.weight}
            onChange={e => this.change(e)}
            placeholder="Weight(in Kg)"
          />
          </div>}
          {!this.props.updatingUser && <div>
          <input
            type ="password"
            name ='pass'
            value={this.state.pass}
            onChange={e => this.change(e)}
            placeholder="Password"
       
          />
          <input
            type="password"
            name='confirmPword'
            value={this.state.confirmPword}
            onChange= {e => this.change(e)}
            placeholder="Confirm Password"
    
          />
          </div>}
          <button onClick={e => this.state.value(e)}>{this.state.action}</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({userReducer, registerReducer}) =>{
    return ({
        updatingUser: userReducer.updatingUser,
        registering: registerReducer.registering
    })
}
export default connect(
mapStateToProps,
  { register, updateProfile, getProfile }
)(Register);
