import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./HomePage.css";


export default function HomePage() {
  return (
    <div className="wrapper">
      <div className="inner-wrapper">
        <h1 className="title">Welcome</h1>
        <div>
          <Link to="login" className="link" >
            <Button className="button" variant="contained">Login</Button>
          </Link>
          <Link to="register" className="link">
            <Button className="button" variant="contained">Signup</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
