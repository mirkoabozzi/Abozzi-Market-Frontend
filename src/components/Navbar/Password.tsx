import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../../redux/store";
import { findUserByEmail } from "../../redux/actions/user";

interface PasswordProps {
  show: boolean;
  handleClose: () => void;
}
const Password = ({ show, handleClose }: PasswordProps) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(findUserByEmail(email));
    handleClose();
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Recupera password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <div className="text-center">
            <Button variant="secondary" className="m-2 rounded-pill" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="submit" variant="primary" className="rounded-pill">
              Recupera
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
      <ToastContainer />
    </Modal>
  );
};

export default Password;
