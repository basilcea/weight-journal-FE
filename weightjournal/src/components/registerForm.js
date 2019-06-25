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
      password: "",
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
          password: ""
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

  registerUser = e => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPword) {
      this.props.register(this.state);
    }
  };
  render() {
    return (
      <div>
        Register on Lifted
        <form onSubmit={e => this.registerUser(e)}>
        <div>
          <button onClick={this.uploadPicture}>Upload Picture </button>
          <img src={this.state.src} alt="" />
          </div>
          <input
            type="text"
            value={this.state.username}
            onChange={e => this.change(e)}
            placeholder="Username"
            required
          />
          <input
            type="email"
            value={this.state.email}
            onChange={e => this.change(e)}
            placeholder="Email"
            required
          />
          <input
            type="age"
            value={this.state.age}
            onChange={e => this.change(e)}
            placeholder="Age"
          />
          <input
            type="number"
            value={this.state.height}
            onChange={e => this.change(e)}
            placeholder="Height(in Ft)"
          />
          <input
            type="number"
            value={this.state.weight}
            onChange={e => this.change(e)}
            placeholder="Weight(in Kg)"
          />
          {!this.props.updatingUser && <div>
          <input
            type="password"
            value={this.state.confirmPword}
            onChange={e => this.change(e)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={this.state.user}
            onChange={e => this.change(e)}
            placeholder="Confirm Password"
            required
          />
          </div>}
          <button>Register</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({userReducer}) =>{
    return ({
        updatingUser: userReducer.updatingUser
    })
}
export default connect(
mapStateToProps,
  { register, updateProfile, getProfile }
)(Register);
