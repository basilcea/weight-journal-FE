import React, { useEffect, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getProfile } from "../state/actionCreators";
import { Link } from "react-router-dom";

const Profile = props => {
  useEffect(() => {
    props.getProfile(props.match.params.id);
  }, []);
  return (
    <Fragment>
      {!props.error && (
        <div>
          <img src={props.user.src} alt="" />
          <h1> {props.user.username} </h1>
          <p> {props.user.email}</p>
          <p>{props.user.height}</p>
          <p>{props.user.weight}</p>
          <p>{props.user.age}</p>
        </div>
      )}
      {props.error && (
        <div>
          <p>Page Not Found</p>
          <p>{props.error}</p>
          <Link to="/">Go Back</Link>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return {
    user: userReducer.user,
    error: userReducer.error
  };
};
export default connect(
  mapStateToProps,
  { getProfile }
)(Profile);
