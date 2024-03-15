import React, { useState } from 'react';
import './AuthStyles.css'; // Make sure this path is correct

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement the password reset logic here
    console.log(email); // For testing, to see if the email is captured
  };

  return (
    <div className="auth-container"> {/* Ensure this class exists in your CSS */}
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email" className="label">Email:</label>
        <input
          type="email"
          id="email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="button">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordReset;

