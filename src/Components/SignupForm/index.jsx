import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Google } from 'react-bootstrap-icons';
import './style.css';
import { useAuth } from '../../utils/AuthContext';

const SignupForm = () => {
  const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { registerUser, loading } = useAuth();


  const handleAuth= async(e)=>{
    e.preventDefault()

    await registerUser(name, email, password)
  }

  return (
    <Container>
      <Form className="signup-form" onSubmit={handleAuth}>
        <h2>Crie sua conta</h2>

        <Form.Group controlId="name" className="form-group">
          <Form.Label>Nome *</Form.Label>
          <Form.Control type="text" placeholder="Digite seu nome"  value={name}
								onChange={(e) => setName(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="email" className="form-group" >
          <Form.Label>Email *</Form.Label>
          <Form.Control type="email" placeholder="Digite seu e-mail" value={email}
								onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="password" className="form-group">
          <Form.Label>Senha *</Form.Label>
          <Form.Control type="password" placeholder="Senha" value={password}
								onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit" className="btn-block">
          {loading ? "Carregando..." : "Entrar"}
        </Button>

        <Button variant="light" className="btn-google btn-block">
          <Google className="ico"/> Entre com o Google
        </Button>

        <p className="login-text">
          Já tem uma conta? <a href="/login">Faça login</a>
        </p>
      </Form>
    </Container>
  );
};

export default SignupForm;
