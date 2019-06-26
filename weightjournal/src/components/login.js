import React from "react";
import { login } from "../state/actionCreators";
import styled from "styled-components";
import { connect } from "react-redux";
import Register from './registerForm';

class Login extends React.Component {
  
  nameRef = React.createRef();
  passRef = React.createRef();

  loginUser = e => {
    e.preventDefault();
    let username = this.nameRef.current.value;
    let password = this.passRef.current.value;
    this.props.login({
        username : username, password : password});
  };

  render() {
    return (
      <div>
        <div>
          Login to Lifted
          <form onSubmit={e => this.loginUser(e)} action='POST'>
            <input ref={this.nameRef} type="text" placeholder="Username" />
            <input ref={this.passRef} type="password" placeholder="Password" />
            <button> Login</button>
          </form>
        </div>
        <Register/>
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(Login);
