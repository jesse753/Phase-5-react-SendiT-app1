import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authenticate } from '../utils';
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
          const response = await axios.post('http://localhost:3000/api/login', data);
          const { token } = response.data;
          authenticate(token);
      
          if (response.status === 202) {
            // Successful login
            console.log('Login Successful');
            setError(null);
            // Clear the login form
            navigate('/hero');
            setLoginData({
              email: '',
              password: '',
            });
          } else {
            // Failed login
            console.log('Login Failed');
            setError('Login Failed');
            // Clear the login form
            setLoginData({
              email: '',
              password: '',
            });
          }
        } catch (error) {
          console.error('Error logging in:', error);
          setError('An error occurred while logging in');
        }
      };

    return (
        <div className="sign-up">
            <div className="sign-header">
                <h1>Login</h1>
                <p>
                    Please complete the form below to access your account and
                    start using our platform
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter email..."
                        value={loginData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="create password.."
                        value={loginData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <h3 className="error">{error}</h3>
                <button className="btn-in" type="submit">
                    Login
                </button>
            </form>
            <Link to="/register" className="option">
                Don't have an account? Register here
            </Link>
        </div>
    );
};

export default Login;
