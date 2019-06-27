import React from "react";
import Register from "./registerForm";
import Login from "./login";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
// import Carousel from './carousel';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  background-image: url("https://wallpaperplay.com/walls/full/7/b/5/32717.jpg");
  background-size: cover;
  background-position: left center;
  min-height: 100vh;
  background-repeat: no-repeat;
  z-index: -2;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  min-height: 100vh;
  opacity: 0.5;
  align-items: center;
  justify-content: center;
`;
const Stripe1 = styled.div`
  background-color: white;
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
`;
const Stripe2 = styled.div`
  background-color: white;
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
`;
const SignUpContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PictureContainer = styled.div`
  display: flex;
  margin-top: 40%;
  border-radius: 50%;
  width: 35%;
  height: 15vh;
  background-color: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 3;
`;
const Picture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 50%;
  width: 90%;
  margin: 3% 5%;
  height: 14;
  text-align: center;
  font-size: 3em;
  color: green;
`;
const FormContainer = styled.div`
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
  height: 30vh;
  border-radius: 5%;
  padding-left: 10%;
  padding-right: 10%;
`;
const Heromessage = styled.div`
  transform: translate(6vw, 18vh);
  width: 55%;
  h1 {
    text-align: center;
    color: green;
  }
  div {
    padding-top: 5%;
    font-size: 1.3em;
  }
`;
const LineBar1 = styled.div `
    background-color:green;
    width:100%;
    height:10vh;
    transform: translateY(24vh);
`;
const LineBar2 = styled.div `
    background-color:green;
    width:100%;
    height:10vh;
    transform: translateY(16vh);
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
            <h1>You're Lifted !</h1>
            <div>
              <p>Keep a track of your weight lifting progress on Lifted</p>
              <p>Track sets, reps and time elapsed for each workout</p>
            </div>
          </Heromessage>
          <LineBar1 />
        </Stripe1>
      </Hero>
      <SignUpContainer>
        <PictureContainer>
          <Picture>
            <FaUser />
          </Picture>
        </PictureContainer>
        <FormContainer>
          {this.state.loginOpen && <Login  openRegister= {this.openRegister}/>}
          {this.state.registerOpen && <Register openLogin = {this.openLogin}/>}
        </FormContainer>
      </SignUpContainer>
      <Hero>
        <Stripe2>
        <LineBar2 />
        {/*<Carousel/> */}
        </Stripe2>
      </Hero>
    </Container>
  );
};
}
export default Modal;
