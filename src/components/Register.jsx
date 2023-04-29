import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./BackendURL"

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios
        .post(`${BACKEND_URL}/register`, user)
        .then((res) => {
          alert(res.data.message);
          navigate("/login");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      alert("Invalid input");
    }
  };

  return (
    <div className="main-container">
      <div className="register">
        <h1>Register</h1>
        <input
          type="text"
          name="name"
          value={user.name}
          required
          placeholder="Your Name"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="email"
          value={user.email}
          required
          placeholder="Your Email"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          required
          placeholder="Your Password"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="reEnterPassword"
          value={user.reEnterPassword}
          placeholder="Re-enter Password"
          onChange={handleChange}
        ></input>
        <div className="button" onClick={register}>
          Register
        </div>
        <div>or</div>
        <div className="button" onClick={() => navigate("/login")}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Register;
