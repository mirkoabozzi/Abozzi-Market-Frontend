import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { url } from "../../redux/actions/user";
import { errorToast, successToast } from "../../redux/actions/toaster";

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
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`${url}/authentication/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (resp.ok) {
        handleClose();
        successToast("Registrazione avvenuta con successo, conferma la tua email!");
      } else {
        errorToast("Email già presente!");
        throw new Error("Registration error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      errorToast("Le password non corrispondono");
    } else {
      register();
      setUserData({ name: "", surname: "", phoneNumber: "", email: "", password: "", confirmPassword: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrati</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Nome" name="name" required autoFocus value={userData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Label>Cognome</Form.Label>
            <Form.Control type="text" placeholder="Cognome" name="surname" required value={userData.surname} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNumber">
            <Form.Label>Numero di telefono</Form.Label>
            <Form.Control type="text" placeholder="Numero" name="phoneNumber" required value={userData.phoneNumber} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" name="email" required value={userData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <div className="position-relative">
              <Form.Control type={showPassword ? "text" : "password"} placeholder="****" name="password" required value={userData.password} onChange={handleChange} />
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashFill /> : <EyeFill />}
              </span>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Conferma password</Form.Label>
            <div className="position-relative">
              <Form.Control type={showConfirmPassword ? "text" : "password"} placeholder="****" name="confirmPassword" required value={userData.confirmPassword} onChange={handleChange} />
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
              </span>
            </div>
          </Form.Group>
          <div className="d-flex flex-column gap-3 flex-sm-row justify-content-sm-center">
            <Button className="rounded-pill" variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="submit" variant="primary" className="rounded-pill">
              {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Registrati"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Registration;
