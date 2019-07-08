import React from "react";
import Register from "./registerForm";
import Login from "./login";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
// import Carousel from './carousel';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
   background-color: rgb(34, 33, 33); 
  background-image: url("https://wallpaperplay.com/walls/full/7/b/5/32717.jpg");
  background-size: cover;
  background-position: left center;
  min-height: 100vh;
  background-repeat: no-repeat;
  z-index: -2;
  @media (max-width:500px){
    flex-direction: column
  }
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  opacity: 0.5;
  align-items: center;
  justify-content: center;
  @media (max-width:500px){
    width: 100%;
    justify-content: flex-start;
    margin-top:5%;
  }
 
`;
const Stripe1 = styled.div`
  background-color: black;
  display:flex;
  width: 100%;
  height: 80vh;
  clip-path: polygon(
    90% 20%,
    80% 40%,
    80% 60%,
    90% 80%,
    20% 80%,
    10% 60%,
    10% 40%,
    20% 20%
  );
  @media (max-width:500px){

    height:25vh;
    clip-path: polygon(
    80% 0%,
    90% 30%,
    90% 60%,
    80% 90%,
    20% 90%,
    10% 60%,
    10% 30%,
    20% 0%
  );
  }
`;
const Stripe2 = styled.div`
display:flex;
  background-color: black;
  width: 100%;
  height: 80vh;
  clip-path: polygon(
    80% 20%,
    90% 40%,
    90% 60%,
    80% 80%,
    10% 80%,
    20% 60%,
    20% 40%,
    10% 20%
  );
  @media (max-width:500px){

height:25vh;
clip-path: polygon(

80% 0%,
90% 30%,
90% 60%,
80% 90%,
20% 90%,
10% 60%,
10% 30%,
20% 0%
);
}
`;
const SignUpContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width:500px){
    width:30%;
    margin-top:30%;
  }
  @media (min-width:1000px){
    width:30%;
    margin-top:12.5%;
  }
`;
const PictureContainer = styled.div`
  display: flex;
  border-radius: 50%;
  width: 35%;
  height: 15vh;
  background-color: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 3;
  @media (max-width: 500px){
    margin-top:0%;
    width: 20%;
  height: 10vh;
  }
`;
const Picture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 50%;
  width: 90%;
  margin: 3% 5%;
  text-align: center;
  font-size: 3em;
  color: grey;
  @media (max-width:500px){
    font-size: 1.5em;
  }
`;
const FormContainer = styled.div`
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 80%;
  height: 35vh;
  border-radius: 5%;
  padding-left: 10%;
  padding-right: 10%;
  @media (max-width:500px){
    box-shadow:none;
  }
`;
const Heromessage = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  width: 70%;
  margin: 12% 15%;
  h1 {
    text-align: center;
    color: silver;
    font-weight:bold;
    text-shadow:1px 1px black;
    font-size:2em;
  }
  div {
    font-size: 1.3em;
    @media(max-width:500px){
      font-size:1em;
      color:white;
      text-shadow:2px 2px black;
    }
  }
`;



class Modal  extends React.Component{
    constructor(props){
        super(props)
        this.state={
            registerOpen: false,
            loginOpen: true,

        }
      
    }
    openLogin = () =>{
        this.setState({
            registerOpen:false,
            loginOpen:true
        })
    }
    openRegister = () => {
        this.setState({
            registerOpen:true,
            loginOpen:false
        })
    }
  
    render(){
  return (
    <Container>
      <Hero>
        <Stripe1>
          <Heromessage>
            <h1>Lifted </h1>
          </Heromessage>
         
        </Stripe1>
      </Hero>
      <SignUpContainer>
        <PictureContainer>
          <Picture>
            <FaUser />
          </Picture>
        </PictureContainer>
        <FormContainer>
          {this.state.loginOpen && <Login  openRegister= {this.openRegister} error={this.error}/>}
          {this.state.registerOpen && <Register openLogin = {this.openLogin}/>}
        </FormContainer>
      </SignUpContainer>
      <Hero>
        <Stripe2>
        <Heromessage>
        <div>
        <p>Track your weight lifting progress.</p>
      </div>
      </Heromessage>

        </Stripe2>
      </Hero>
    </Container>
  );
};
}
export default Modal;
