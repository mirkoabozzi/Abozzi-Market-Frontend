import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { url } from "../../redux/actions/user";

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

  const [showPassword, setShowPassword] = useState(false);

  const register = async () => {
    try {
      const resp = await fetch(`${url}/authentication/registration`, {
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

  const togglePassword = () => {
    setShowPassword(!showPassword);
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
            <Form.Control type="text" placeholder="Cognome" name="surname" required value={userData.surname} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Numero di telefono</Form.Label>
            <Form.Control type="text" placeholder="Numero" name="phoneNumber" required value={userData.phoneNumber} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" name="email" required value={userData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <div className="position-relative">
              <Form.Control type={showPassword ? "text" : "password"} placeholder="****" name="password" required value={userData.password} onChange={handleChange} />
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} onClick={togglePassword}>
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </span>
            </div>
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
    </Modal>
  );
};

export default Registration;
