import React from "react";
import "./Login.css";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import  loginService  from "../../services/login.service";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState((<p></p>));
  const navigate = useNavigate();
  async function handleSubmit(e){
    e.preventDefault();
    const response = await loginService(loginForm)
    .catch(error => {
      setLoginError((<p className="error-message">{error.response.data.message}</p>));
    });
    if(response){
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      navigate("/main");
    }
  } 
  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="mg-30">
          <h1 className="title">Login</h1>
        </div>
        <div className="mg-30">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            required
            value={loginForm.email}
            onChange={(e) =>
              setLoginForm({ ...loginForm, email: e.target.value })
            }
          />
        </div>
        <div className="mg-30">
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            required
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
          />
        </div>
        <div className="mg-30">
          <Button variant="contained" type="submit">
            Send
          </Button>
        </div>
      </form>
      <div className="mg-30">
        {loginError}
      </div>
    </div>
  );
}
