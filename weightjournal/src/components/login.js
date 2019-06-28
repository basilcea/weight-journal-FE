import React from "react";
import { login } from "../state/actionCreators";
import styled from "styled-components";
import { connect } from "react-redux";
import { FaUser, FaLock } from "react-icons/fa";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  transform: translateY(-8vh);
  h2 {
    font-family: "Roboto", sans-serif;
    text-align: center;
    font-weight:bold;
    font-size:1.5em;
  }
`;
const Form = styled.form`
  background-color: white;
  border-radius: 10px;
  opacity:0.8;
  padding-left: 5%;
  padding-right:5%;
  padding-top:7vh;
  padding-bottom:3vh;
  font-family: "Roboto" sans-serif;
  display: flex;
  flex-direction: column;
  div {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 5vh;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10%;
      text-align: center;
      color: white;
      height: 4vh;
      background-color: lightgreen;
      border-radius: 5px 0px 0px 5px;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    input {
      width: 90%;
      height: 4vh;
      background-color: green;
      outline: none;
      border: none;
      padding-left:5%;
      border-radius: 0px 5px 5px 0px;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
        &::placeholder{
            color:white;
            font-size:1.5em;
        }
    }
  }
`;
const Button = styled.button`
  width: 40%;
  margin-left:30%;
  margin-top:5%;
  background-color: green;
  padding: 0% 5%;
  border-radius: 5px;
  outline:none;
  height:4vh;
  font-size:1em;
  color:white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
&:hover{
    background-color:black;
}
`;
const Register = styled.div `
    background-color:white;
    opacity:0.8;
    margin-top:3%;
    border-radius:10px;
    p{
        color:green;
        text-align:center;
        font-weight:bolder;
    }

`;


class Login extends React.Component {
  nameRef = React.createRef();
  passRef = React.createRef();

  loginUser = e => {
    e.preventDefault();
    let username = this.nameRef.current.value;
    let password = this.passRef.current.value;
    this.props.login({
      username: username,
      password: password
    });
  };

  render() {
    return (
      <LoginContainer>
        <Form onSubmit={e => this.loginUser(e)} action="POST">
          <h2>Login to Lifted</h2>
          <div>
            <span>
              <FaUser />
            </span>
            <input ref={this.nameRef} type="text" placeholder="Username" />
          </div>
          <div>
            <span>
              <FaLock />
            </span>
            <input ref={this.passRef} type="password" placeholder="Password" />
          </div>
          <Button> Login</Button>
        </Form>
        <Register>
          <p>Not Lifted?</p>
          <Button onClick={() =>this.props.openRegister()}>Register</Button>
        </Register>
      </LoginContainer>
    );
  }
}

export default connect(
  null,
  { login }
)(Login);
