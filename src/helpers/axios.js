import axios from "axios";
import { api } from "../urlConfig";

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default axiosInstance;
