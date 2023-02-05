import axios from "axios";

const API_URL = process.env.API_URL || "http://192.168.132.154:8000/api/";

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("IS-token"),
  },
});
