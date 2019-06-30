import React, {  Fragment } from "react";
import { connect } from "react-redux";
import { getProfile } from "../state/actionCreators";
import { Link } from "react-router-dom";
import Navbar from './navbar'


class Profile extends React.Component {
    componentDidMount(){
        this.props.getProfile(this.props.match.params.id);
    }
   
  


 render(){
  return (
    <Fragment>
    <Navbar />
      {!this.props.error && (
        <div>
          <img src={this.props.user.src} alt="" />
          <h1> {this.props.user.username} </h1>
          <p> {this.props.user.email}</p>
          <p>{this.props.user.height}</p>
          <p>{this.props.user.weight}</p>
          <p>{this.props.user.age}</p>
        </div>
      )}
      {this.props.error && (
        <div>
          <p>Page Not Found</p>
          <p>{this.props.error}</p>
          <Link to="/">Go Back</Link>
        </div>
      )}
    </Fragment>
  );
};
}
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
