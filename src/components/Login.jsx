import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "./BackendURL"

const Login = ({ setLoginUser }) => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    console.log(BACKEND_URL)

    const login = () => {
        axios.post(`${BACKEND_URL}/login`, user)
            .then(res => {
                alert(res.data.message)
                setLoginUser(res.data.user)
                navigate("/")
            })
    }

    return (
        <div className="main-container">
            <div className="login">
                <h1>Login</h1>
                <input type="text" name="email" value={user.email} onChange={handleChange} required placeholder="Enter your Email"></input>
                <input type="password" name="password" value={user.password} onChange={handleChange} required placeholder="Enter your Password" ></input>
                <div className="button" onClick={login}>Login</div>
                <div>or</div>
                <div className="button" onClick={() => navigate("/register")}>Register</div>
            </div>
        </div>

    )
}

export default Login
