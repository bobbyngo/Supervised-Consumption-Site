
import { useState } from 'react';
import './AuthStyles.css'; // Ensure this path is correct for your project
const NewPassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('New passwords do not match.');
      return;
    }
    // Reset error message
    setErrorMessage('');

    // Call AuthService.changePassword() with new password data
    console.log('Submitting new password:', passwordData.newPassword);
    // Implement the call to AuthService here
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="currentPassword" className="label">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          className="input-field"
          value={passwordData.currentPassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="newPassword" className="label">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          className="input-field"
          value={passwordData.newPassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword" className="label">Confirm New Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="input-field"
          value={passwordData.confirmPassword}
          onChange={handleChange}
          required
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="button">Update Password</button>
      </form>
    </div>
  );
};

export default NewPassword;
