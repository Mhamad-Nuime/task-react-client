import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/homePage/HomePage.js";
import LoginPage from './components/loginPage/LoginPage';
import RegisterPage from './components/registerPage/RegisterPage';
import MainPage from './components/mainPage/MainPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>, 
  },
  {
    path: "login",
    element: <LoginPage/>, 
  },
  {
    path: "register",
    element: <RegisterPage/>
  },
  {
    path: "main",
    element: <MainPage/>
  }
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
