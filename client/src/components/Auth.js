import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const Auth = () => {
  const [cookies, setCookie] = useCookies(['Email', 'AuthToken']);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const viewLogin = (status) => {
    setError('');
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          // User exists in the database
          setCookie('Email', email);
          setCookie('AuthToken', data.token);
          window.location.reload();
        } else {
          // User not found in the database
          setError('User not found. Please check your email and password.');
        }
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? 'Please Login' : 'Please Sign Up!'}</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {!isLogin && <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />}
          <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')} />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button onClick={() => viewLogin(false)} style={{ backgroundColor: !isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)' }}>
            Sign Up
          </button>
          <button onClick={() => viewLogin(true)} style={{ backgroundColor: isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)' }}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
