import Decode from "jwt-decode";

const decoded = () => {
    const info = Decode(localStorage.getItem('token'));
    return info;
  };

  export default decoded