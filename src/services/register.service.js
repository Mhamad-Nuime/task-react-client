import axios from "axios";

export default async function registerService(registerData){
  return axios.post("http://localhost:5050/api/v1/auth/register", registerData);
}