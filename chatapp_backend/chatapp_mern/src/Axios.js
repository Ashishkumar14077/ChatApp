import Axios from "axios";
const port = process.env.PORT || "9000";
const instance = Axios.create({
  baseURL: "https://chat-app-mern-clone.herokuapp.com",
  //   withCredentials: false, // This is the default
  //   crossDomain: true,
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   timeout: 10000,
});

export default instance;
