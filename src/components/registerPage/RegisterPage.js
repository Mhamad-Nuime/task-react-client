import React, { useEffect } from "react";
import { useState } from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Checkbox,
  Button,
} from "@mui/material";
import MuiDatePicker from "./muiDatePicker.js";
import dayjs from "dayjs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./RegisterPage.css";
import registerService from "../../services/register.service.js";
import { useNavigate } from "react-router-dom";
import registerSchema from "../../validations/register.validation";
import { setLocale } from 'yup';

export default function RegisterPage() {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: dayjs(Date.now()),
    gender: "",
    phoneNumber: "",
  });
  const [valid, setValid] = useState(false);
  const [isAsserted, setIsAsserted] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();
  async function handleRegisteration(e){
    e.preventDefault();
    await registerSchema().validate(registerForm)
    .then(async () => {
      const response = await registerService({...registerForm, birthDate : registerForm.birthDate.toDate()})
      .catch((error)=> {
        setRegisterError((<p className="error-message mg-20">{error.response.data.message}</p>)); 
      });
      if(response){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        navigate("/main");
      }
    })
    .catch((error) => {
      let count = 1 ;
      setRegisterError(error.errors.map((error) => (<p key={count + 1} className="error-message mg-20">{error}</p>)))
    });
  }
  return (
    <div>
      <form>
        <h1 className="title">Signup</h1>
        <div className="mg-20">
          <div className="pd-h-20">
            <TextField
              id="fisrtName"
              label="First Name"
              variant="outlined"
              required
              value={registerForm.firstName}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, firstName: e.target.value })
              }
            />
          </div>
          <div className="pd-h-20">
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              required
              value={registerForm.lastName}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, lastName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mg-20">
          <div className="pd-h-20">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              required
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
            />
          </div>
          <div className="pd-h-20">
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              required
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mg-20">
          <MuiDatePicker
            registerForm={registerForm}
            birthDate={registerForm.birthDate}
            setRegisterForm={setRegisterForm}
          />
        </div>
        <div className="mg-20">
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={registerForm.gender}
              onChange={(e) => {
                setRegisterForm({ ...registerForm, gender: e.target.value });
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="mg-20">
          <PhoneInput
            style={{ width: "fit-content", margin: "auto", height: "50px" }}
            country={"us"}
            value={registerForm.phoneNumber}
            onChange={(value) =>
              setRegisterForm({ ...registerForm, phoneNumber: value })
            }
            inputProps={{
              style: { height: "50px" },
            }}
          />
        </div>
        <div className="mg-20">
          <FormControlLabel
            control={
              <Checkbox
                checked={isAsserted}
                onChange={(e) => {
                  setIsAsserted(e.target.checked);
                }}
              />
            }
            label="I confirm that all the information above is correct"
          />
        </div>
        <div className="mg-20">
          <Button variant="contained" type="submit" onClick={handleRegisteration} disabled={false}>
            Send
          </Button>
        </div>
        <div className="mg-20">
        {registerError}
        </div>
      </form>
    </div>
  );
}
