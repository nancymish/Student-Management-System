import API from "./axios";

const API = axios.create({
  baseURL: "https://student-management-system-wf67.onrender.com/api",
  withCredentials: true,
});


export const getProfile = () => API.get("/profile");

export const updateProfile = (data) =>
  API.put("/profile", data);

export const logout = () => API.post("/logout");
