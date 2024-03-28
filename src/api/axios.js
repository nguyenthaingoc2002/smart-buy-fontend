import axios from "axios";
const url = "http://localhost:3001/api/";

export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
