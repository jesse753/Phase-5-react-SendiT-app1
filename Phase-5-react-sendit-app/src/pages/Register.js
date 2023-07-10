import React, { useState} from "react";
import "../styles/register.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import { authenticate } from '../utils'

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // useEffect(() => {
    //     localStorage.setItem("userCredentials", JSON.stringify(formData));
    // }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Perform form validation and submission logic here
    //     // localStorage.setItem("userCredentials", JSON.stringify(formData));
    //     //RESET THE FORM
    //     setFormData({
    //         username: "",
    //         email: "",
    //         password: "",
    //         confirmPassword: "",
    //     });
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/api/signup', {user: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }},);
          const { token } = await response.data;
        authenticate(token);
          if (response.status === 201) {
            // Successful form submission
            console.log('Form submitted successfully');
            // Reset the form
            setFormData({
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            });
          } else {
            // Form submission failed
            console.log('Form submission failed');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
    return (
        <div className="sign-up">
            <div className="sign-header">
                <h1>Sign Up</h1>
                <p>
                    Welcome to our delivery logistic app registration! Please
                    complete the form below to create your account and start
                    using our platform.
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="username..."
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter email..."
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="create password.."
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password..."
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="btn-in">
                    <Link className="btn-link" to="/login">
                        Sign Up
                    </Link>
                </button>
            </form>
            <Link to="/login" className="option">
                Already have an account? Login here
            </Link>
        </div>
    );
};

export default Register;
