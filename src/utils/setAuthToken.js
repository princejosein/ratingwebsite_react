import axios from "axios";

const setAuthToken = () => {
  let token = localStorage.getItem('token');
  if(token)
  {
    const authToken = `Token ${token}`;
    axios.defaults.headers.common["Authorization"] = authToken;   
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
