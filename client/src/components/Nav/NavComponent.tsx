import React, { useContext } from "react";
import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import styled from "styled-components";

const LeftNavContainer = styled.div`
  margin-left: auto;
`;

function NavComponent() {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };
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
            {state.data && (
              <LeftNavContainer>
                <NavLink onClick={handleLogout}>Logout</NavLink>
              </LeftNavContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavComponent;
