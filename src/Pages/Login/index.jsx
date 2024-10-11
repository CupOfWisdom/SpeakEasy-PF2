import React from 'react';
import './style.css';
import LoginForm from '../../Components/LoginForm';
import { Container, Row, Col } from 'react-bootstrap';

const Login = () => {
    return (
      <div className="login-page">
        <div className="login-card">
          <LoginForm />
        </div>
      </div>
    );
  };
  
  export default Login;

