import React, {useState} from "react";
import axios from "axios";
import {BACKEND_URL, LOGIN_API, REGISTER_API, STORAGE_TOKEN_ENTRY} from "../utils/constants.jsx";
import {RegisterForm} from "../components/RegisterForm.jsx";
import {LoginForm} from "../components/LoginForm.jsx";
import './Login.css';
import {useNavigate} from "react-router-dom";

export const Login = () => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveToken = token => localStorage.setItem(STORAGE_TOKEN_ENTRY, token);

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(BACKEND_URL + LOGIN_API, {email, password})
      .then(e => {
        saveToken(e.data.token);
        navigate('/');
      })
  }

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post(BACKEND_URL + REGISTER_API, {username, email, password})
      .then(e => {
        saveToken(e.data.token);
        navigate('/');
      })
  }
  return (
    <>
      {register ? <>
          <RegisterForm handleRegister={handleRegister} setEmail={setEmail} setPassword={setPassword}
                        setUsername={setUsername}/>
          <a onClick={() => setRegister(false)}>Sign in instead</a>
        </> :
        <>
          <LoginForm handleLogin={handleLogin} setEmail={setEmail} setPassword={setPassword}/>
          <a onClick={() => setRegister(true)}>Sign up instead</a>
        </>}
    </>
  )
}
