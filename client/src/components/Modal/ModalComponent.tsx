import React, { useState, useContext } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

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
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, setState] = useContext(UserContext);

  const handleClick = async () => {
    let response;
    if (isSignupFlow) {
      const { data: signUpData } = await axios.post(
        "http://localhost:5000/auth/signup",
        {
          email,
          password,
        }
      );
      response = signUpData;
      // console.log(data);
    } else {
      const { data: loginData } = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email,
          password,
        }
      );
      response = loginData;
    }
    // console.log(data);
    if (response.errors.length) {
      return setErrorMsg(response.errors[0].msg);
    }
    // need to set the state after loggin in/signing up, to allow nav bar to get context
    setState({
      data: {
        id: response.data.user.id,
        email: response.data.user.email,
      },
      loading: false,
      error: null,
    });
    // Store the token in local storage.
    localStorage.setItem("token", response.data.token);
    // set default axios header
    axios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${response.data.token}`;
    // Navigate to articles page
    navigate("/articles");
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
