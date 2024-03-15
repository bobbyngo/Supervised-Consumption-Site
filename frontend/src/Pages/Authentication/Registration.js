import React, { useState } from 'react';
import './AuthStyles.css'; // Ensure this path is correct for your project

const Registration = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setErrorMessage('');

    // Implement your registration logic here, possibly calling an AuthService.register() method
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="name" className="label">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="input-field"
          value={userDetails.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="input-field"
          value={userDetails.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className="label">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="input-field"
          value={userDetails.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="input-field"
          value={userDetails.confirmPassword}
          onChange={handleChange}
          required
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
};

export default Registration;
