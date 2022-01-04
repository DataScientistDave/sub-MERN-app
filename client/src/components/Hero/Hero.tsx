import React from "react";
// This is usually an error in typescript coz with every installed library you need to install the types as well
import styled from "styled-components";
import { Container } from "react-bootstrap";
import ModalComponent from "../Modal/ModalComponent";

// styled components is a library to create custom styled components
const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 90vh;
  background-image: url("https://images.unsplash.com/photo-1573633509389-0e3075dea01b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80");
  background-position: center;
  background-size: cover;
`;

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 2rem;
  color: white;
  width: 20rem;
`;

const Heading = styled.h1`
  font-size: 2rem;
`;

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-size: 1rem;
`;

function Hero() {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading> Feed your mind with the best</Heading>
          <SubHeading>
            Grow, learn and become more succesful by reading some of the top
            articles by highly reputable individuals.
          </SubHeading>
          <ModalComponent
            text="Sign Up"
            variant="primary"
            isSignupFlow={true}
          />
          <ModalComponent text="Login" variant="danger" isSignupFlow={false} />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
}

export default Hero;
