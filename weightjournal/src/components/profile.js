import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getProfile } from "../state/actionCreators";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
  }
  // )= props => {
  //   useEffect(() => {
  //     props.getProfile(props.match.params.id);
  //   });
  render() {
      console.log(this.props.user)

        if(!this.props.error){
            return(
        <div>
          <img src={this.props.user.src} alt="" />
          <h1> {this.props.user.username} </h1>
          <p> {this.props.user.email}</p>
          <p>{this.props.user.height}</p>
          <p>{this.props.user.weight}</p>
          <p>{this.props.user.age}</p>
        </div>
            )}
        return (<div>
          <p>Page Not Found</p>
          <Link to="/">Go Back</Link>
        </div>)
  }
}

const mapStateToProps = userReducer => {
  return {
    user: userReducer.user.user,
    error: userReducer.user.error
  };
};
export default connect(
  mapStateToProps,
  { getProfile }
)(Profile);
