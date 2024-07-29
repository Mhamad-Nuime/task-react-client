import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import "./MainPage.css";

export default function MainPage() {
  const role = localStorage.getItem("role");
  const [result, setResult] = useState(null);
  async function checkIFAuthenticated() {
    await axios
      .get("http://localhost:5050/api/v1/amIAuthenicated" , {headers : { Authorization: localStorage.getItem("token")}})
      .then((response) => {
        setResult(<p className="success-message">{response.data.message}</p>);
      })
      .catch((error) => {
        setResult(<p className="fail-message">{error.response.data.message}</p>);
      });
  }
  async function checkIfAdmin() {
    await axios
      .get("http://localhost:5050/api/v1/admin", {headers : { Authorization: localStorage.getItem("token")}})
      .then((response) => {
        setResult(<p className="success-message">{response.data.message}</p>);
      })
      .catch((error) => {
        setResult(
          <p className="fail-message">{error.response.data.message}</p>
        );
      });
  }
  if (role === "admin") {
    return (
      <div>
        <div className="wrapper">
          <Button
            className="button"
            variant="contained"
            onClick={checkIFAuthenticated}
          >
            check if you are authenticated
          </Button>
          <Button className="button" variant="contained" onClick={checkIfAdmin}>
            check if you are admin
          </Button>
        </div>
        <div>{result}</div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="wrapper">
          <Button variant="contained" onClick={checkIFAuthenticated}>
            check if you are authenticated
          </Button>
        </div>
        <div>{result}</div>
      </div>
    );
  }
}
