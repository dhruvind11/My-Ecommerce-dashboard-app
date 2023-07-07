import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/product");
    }
  });
  const handleLogin = async () => {
    console.log(email, password);
    let result = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    result = result.data;
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.data));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/product");
    } else {
      alert("please enter correct details");
    }
  };
  return (
    <div className="login">
      <h1> login page </h1>
      <input type="text"placeholder="Enter email"value={email}onChange={(e) => setEmail(e.target.value)}/>
      <br />
      <input type="password"placeholder="enter password"value={password}onChange={(e) => setPassword(e.target.value)}/>
      <br />
      <button onClick={handleLogin}> login </button>
    </div>
  );
}

export default Login;
