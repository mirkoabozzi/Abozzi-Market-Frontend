import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface LoginProps {
  show: boolean;
  handleClose: () => void;
}

const Login = ({ show, handleClose }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const resp = await fetch("http://localhost:3001/authentication/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (resp.ok) {
        const result = await resp.json();
        localStorage.setItem("token", result.accessToken);
        handleClose();
      } else {
        throw new Error("Login error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Accedi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="****" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <div className="text-center">
            <Button className="m-2" variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="submit" variant="primary">
              Accedi
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default Login;
