import React from "react";
import { login, register } from "../state/actionCreators";
import styled from "styled-components";
import { connect } from "react-redux";
import uploader from './upload';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  usernameRef = React.createRef();
  passRef = React.createRef();
  user = React.createRef();
  height = React.createRef();
  weight = React.createRef();
  password = React.createRef();
  email = React.createRef();
  age = React.createRef();
  confirmPword = React.createRef();
  imagesrc;
  uploadPicture = () => {
    uploader(this.getPicture).open()
  }

  getPicture = (value) => {
    this.imagesrc = value.info.url
    return this.imagesrc
  }

  loginUser = e => {
    e.preventDefault();
    let username = this.nameRef.current.value;
    let password = this.passRef.current.vaue;
    this.props.login(username, password);
  };
  registerUser = e => {
    e.preventDefault();
    const data = {
      username: this.user.current.value,
      email: this.email.current.value,
      age: this.age.current.value,
      height: this.height.current.value,
      weight: this.weight.current.value,
      password: this.password.current.value,
      src:this.imagesrc,
    };
    if(data.password === this.confirmPword.current.value){
        this.props.register(data)
    }
  };
  render() {
    return (
      <div>
      <div>
      Login to Lifted
      <form onSubmit={e => this.loginUser(e)}>
      <input ref={this.usernameRef} type="text" placeholder="Username" />
      <input ref={this.passRef} type="password" placeholder="Password" />
      <button> Login</button>
    </form>
      </div>
      <div>
      Register on Lifted
      <form onSubmit={e => this.registerUser(e)}>
      <button onClick = {this.uploadPicture}>Upload Picture </button>
      <img src = {this.src} alt=''/>
      <input type="text" ref={this.user} placeholder="Username" required />
      <input type="email" ref={this.email} placeholder="Email" required />
      <input type="age" ref={this.age} placeholder="Age" />
      <input type="number" ref={this.height} placeholder="Height(in Ft)" />
      <input type="number" ref={this.weight} placeholder="Weight(in Kg)" />
      <input
        type="password"
        ref={this.password}
        placeholder="Password"
        required
      />
      <input
        type="password"
        ref={this.confirmPword}
        placeholder="Confirm Password"
        required
      />
      <button>Register</button>
    </form>
      </div>
      </div>
    );
  }
}

export default connect(
  null,
  { login, register }
)(Login);
