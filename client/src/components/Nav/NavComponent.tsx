import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavComponent() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">The Best</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            {/* Could handle logout by checking if something is in token in local storage. However, everybody has access to local storage and can change things. Use backend do this instead. */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavComponent;
