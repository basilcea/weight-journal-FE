import Decode from "jwt-decode";

const decoded = () => {
    const info = localStorage.getItem('token') && Decode(localStorage.getItem('token'));
    return info ;
  };

  export default decoded