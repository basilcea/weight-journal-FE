import React from "react";

const Authenticate = ExercisePage => Loginpage => {
  return class extends React.Component {
    render() {
      console.log(this.props.loggedIn)
      if (this.props.loggedIn) {
        return <ExercisePage {...this.props} />;
      } else {
        return <Loginpage />;
      }
    }
  };
};
export default Authenticate;
