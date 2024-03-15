
import { useState } from 'react';
import './AuthStyles.css'; // Ensure this path is correct for your project

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setCredentials({ ...credentials, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      // Implement your login logic here, possibly calling AuthService.login(credentials)
    };
  
    return (
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="username" className="label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="input-field"
            value={credentials.username}
            onChange={handleChange}
            required
          />
  
          <label htmlFor="password" className="label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            value={credentials.password}
            onChange={handleChange}
            required
          />
  
          <button type="submit" className="button">Log In</button>
        </form>
      </div>
    );
  };
  export default Login;
  