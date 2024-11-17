import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAppDispatch } from "../../redux/store";
import { resetUserPasswordRequest } from "../../redux/actions/user";

interface ResetUserPasswordRequestProps {
  show: boolean;
  handleClose: () => void;
}
const ResetUserPasswordRequest = ({ show, handleClose }: ResetUserPasswordRequestProps) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      dispatch(resetUserPasswordRequest(email, handleClose, setIsLoading));
    }
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Recupera password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <div className="d-flex flex-column gap-3 flex-sm-row justify-content-sm-center">
            <Button type="button" variant="secondary" className="rounded-pill" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="submit" variant="primary" className="rounded-pill">
              {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Recupera"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ResetUserPasswordRequest;
