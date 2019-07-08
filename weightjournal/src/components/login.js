import React from "react";
import { login } from "../state/actionCreators";
import styled,{keyframes} from "styled-components";
import { connect } from "react-redux";
import { FaUser, FaLock } from "react-icons/fa";
import {slideInRight} from 'react-animations';
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  transform: translateY(-8vh);
  @media (max-width:500px){
    transform:translateY(-7vh)
  }
  h2 {
    font-family: "Roboto", sans-serif;
    text-align: center;
    font-weight:bold;
    font-size:1.5em;
    @media (max-width:500px){
      font-size:1.2em
    }
  }
`;
const Form = styled.form`
  background-color: silver;
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
      background-color: lightgray;
      border-radius: 5px 0px 0px 5px;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    input {
      width: 90%;
      height: 4vh;
      background-color: grey;
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
  background-color: grey;
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
    background-color:silver;
    opacity:0.8;
    margin-top:3%;
    border-radius:10px;
    p{
        color:black;
        text-align:center;
        font-weight:bolder;
    }

`;
const Error = styled.div`
animation:2s ${keyframes `${slideInRight}`};
  display:flex;
  text-align:center;
  justify-content:center;
  align-items:center;
    color:red;
`;


class Login extends React.Component {
  constructor(props){
    super(props)
    this.error = null
    this.tweenElement =  null 
  }
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
          {this.props.error && <Error> {this.props.error} </Error>}
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
const mapStateToProps = ({loginReducer}) => {
  return ({
    error: loginReducer.error})
}

export default connect(
  mapStateToProps,
  { login }
)(Login);
