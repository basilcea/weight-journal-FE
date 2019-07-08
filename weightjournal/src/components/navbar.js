import React, { useEffect } from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { FaPowerOff, FaDumbbell } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import decode from "./decode";
import { logout, getProfile } from "../state/actionCreators";
import { connect } from "react-redux";

const Container = styled.div`
  opacity: 0.8;
  width: 90%;
  z-index: 2;
  display: flex;
  position: fixed;
  top: 0;
  height: 12vh;
  margin-top: 0;
  background-color: white;
  padding: 0 2%;
  @media (max-width: 500px) {
    width: 100%;
  }
  h2 {
    padding-left: 5%;
    color: green;
    @media (max-width: 500px) {
      font-size: 1.3rem;
    }
  }
  p {
    font-size: 1.5rem;
    color: green;
    text-shadow: 1px 1px black;
    @media (max-width: 500px) {
      font-size: 1.3rem;
    }
  }
  a {
    text-decoration: none;
    color: green;
    font-size: 1.4rem;
    text-shadow: 1px 1px black;
    &:hover {
      color: black;
    }
  }
  span {
    width: 10%;
    border-radius: 5px 0px 0px 5px;
    border: none;
    display:flex;
    align-items:center;
    height: 80%;
    outline:none;
    background:inherit;
    font-size: 1.5rem;
    color: green;
  }
`;
const RightSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: green;
    border-radius: 50%;
    width: 8%;
    height: 60%;
    font-size: 1.5rem;
    color: white;
    @media (max-width: 500px) {
      width: 10%;
      font-size: 1.2rem;
      height: 40%;
    }
  }
`;
const Navbar = props => {
  let id, name;

  if (decode()) {
    id = decode().subject;
    const username = decode().username;
    name = username.replace(
      username.charAt(0),
      username.charAt(0).toUpperCase()
    );
  }
  const logout = () => {
    props.logout();
  };
  useEffect(() => {
    props.getProfile();
  }, []);
  const redirect = () => {
    window.location.pathname = `/users/${id}`;
  };
  return (
    <Container>
      <Logo>
        <div>
          <FaDumbbell />
        </div>
        <NavLink to="/">
          <h2> Lifted</h2>
        </NavLink>{" "}
      </Logo>
      <RightSection>
        <p>Welcome {(props.user && props.user.username) || name}</p>
        <span>
          <FaUserCircle onClick={() => redirect()} />
        </span>
        <span>
          <FaPowerOff  onClick={() => logout()}/>
        </span>
      </RightSection>
    </Container>
  );
};
const mapStateToProps = ({ userReducer }) => {
  return {
    user: userReducer.user
  };
};

export default connect(
  mapStateToProps,
  { logout, getProfile }
)(Navbar);
