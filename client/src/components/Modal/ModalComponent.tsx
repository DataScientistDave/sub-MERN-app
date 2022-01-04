import React, { useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";

interface ModalProps {
  text: string;
  // Can define the exact data or just type string
  variant: "primary" | "danger";
  isSignupFlow: boolean;
}

const ErrorMessage = styled.p`
  color: red;
`;

function ModalComponent({ text, variant, isSignupFlow }: ModalProps) {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    let data;
    if (isSignupFlow) {
      const { data: signUpData } = await axios.post(
        "http://localhost:5000/auth/signup",
        {
          email,
          password,
        }
      );
      data = signUpData;
      console.log(data);
    } else {
      const { data: loginData } = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email,
          password,
        }
      );
      data = loginData;
    }
    console.log(data);
    if (data.errors.length) {
      setErrorMsg(data.errors[0].msg);
    }
  };
  return (
    <>
      <Button
        onClick={handleShow}
        variant={variant}
        size="lg"
        style={{ marginRight: "1rem", padding: "0.25rem" }}
      >
        {text}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
