import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './style.css';
import avatar from "../../assets/user.png"

import { useAuth } from '../../utils/AuthContext';

const CustomNavbar = () => {

  const {logOut} = useAuth()

  const handleLogout =()=>{
    logOut()

  }

  return (
    <div>
      <div className="navbar-line-top"></div> {/* Linha roxa no topo */}
      <Navbar bg="light" className="navbar-custom">
        <Container>
          <Navbar.Brand href="#home" className="navbar-brand">
            SpeakEasy
          </Navbar.Brand>
          <Nav className="ml-auto">
            <NavDropdown
              title={
                <div className="profile-picture">
                  <img src={avatar} alt="" />
                </div>
              }
              id="profile-dropdown"
              align="end"
              className="no-arrow"  // Classe para remover seta
            >
              <NavDropdown.Item href="#action1">Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Configurações</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
