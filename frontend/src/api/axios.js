import axios from "axios";

const API = axios.create({ 
    baseURL: "https://student-management-system-wf67.onrender.com/api",
    withCredentials: true,
});

export default API;