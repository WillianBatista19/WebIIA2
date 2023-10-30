import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //lógica de autenticação tem que ficar aqui galera
    console.log('Email:', email);
    console.log('Senha:', password);
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <div className="text-center mb-4">
            <h2 className="display-4">Bem-vindo de volta!</h2>
            <p>Por favor, faça login na sua conta.</p>
          </div>
          <Form onSubmit={handleSubmit} className="form-container">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" block className="button-container">
              Entrar
            </Button>
          </Form>
          
          <div className="text-center mt-3">
            <p>Não tem uma conta? <Link to="/register">Registre-se aqui</Link>.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
