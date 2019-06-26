import React from "react";

const Authenticate = ExercisePage => Loginpage => {
  return class extends React.Component {
    render() {
      if (this.props.loggedIn) {
        return <ExercisePage {...this.props} />;
      } else {
        return <Loginpage />;
      }
    }
  };
};
export default Authenticate;
