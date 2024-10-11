import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Google } from 'react-bootstrap-icons';
import './style.css';

import { useAuth } from '../../utils/AuthContext';

const LoginForm = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const { loginUser, loading } = useAuth();

  const handleAuth= async(e)=>{
      e.preventDefault()
      await loginUser(email, password)
  }



    return (
      <Container>
        <Form className="login-form" onSubmit={handleAuth}>
          <h2>Log in to your account</h2>
          <p>Welcome back! Please enter your details.</p>
          
          <Form.Group controlId="email" className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
  
          <Form.Group controlId="password" className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
  
          <Form.Group className="form-check">
            <Form.Check type="checkbox" label="Remember me" />
            <a href="#" className="forgot-password">Forgot password</a>
          </Form.Group>
  
          <Button variant="primary" type="submit" className="btn-block">
            {loading ? "Carregando..." : "Entrar"}
          </Button>
  
          <Button variant="light" className="btn-google btn-block">
            <Google className='ico'/> Entre com o Google
          </Button>
  
          <p className="sign-up-text">
            Não tem um conta? <a href="/signup">Cadastrar</a>
          </p>
        </Form>
      </Container>
    );
  };
  
  export default LoginForm;
