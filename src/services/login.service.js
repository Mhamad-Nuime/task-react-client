import axios from "axios";

export default async function loginService(loginData){
  return axios.post("http://localhost:5050/api/v1/auth/login", loginData);
}