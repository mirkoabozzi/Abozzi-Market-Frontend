import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface RegistrationProps {
  show: boolean;
  handleClose: () => void;
}
const Registration = ({ show, handleClose }: RegistrationProps) => {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      const resp = await fetch("http://localhost:3001/authentication/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (resp.ok) {
        const result = await resp.json();
        localStorage.setItem("token", result.accessToken);
        handleClose();
      } else {
        throw new Error("Registration error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrati</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Nome" name="name" required autoFocus value={userData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Cognome</Form.Label>
            <Form.Control type="text" placeholder="Cognome" name="surname" required autoFocus value={userData.surname} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Numero di telefono</Form.Label>
            <Form.Control type="text" placeholder="Numero" name="phoneNumber" required autoFocus value={userData.phoneNumber} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" name="email" required autoFocus value={userData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="****" name="password" required autoFocus value={userData.password} onChange={handleChange} />
          </Form.Group>
          <div className="text-center">
            <Button className="m-2" variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="submit" variant="primary">
              Registrati
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default Registration;
