import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { errorToast } from "../../redux/actions/toaster";
import { useAppDispatch } from "../../redux/store";
import { updateUserPassword } from "../../redux/actions/user";

interface ChangePasswordProps {
  show: boolean;
  handleClose: () => void;
}
const ChangePassword = ({ show, handleClose }: ChangePasswordProps) => {
  const dispatch = useAppDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPasswordObj: IUserPasswordUpdate = { oldPassword, newPassword };

    if (newPassword !== confirmPassword) {
      errorToast("Le password non corrispondono");
    } else {
      dispatch(updateUserPassword(newPasswordObj));
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      handleClose();
    }
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cambio password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password attuale</Form.Label>
            <div className="position-relative">
              <Form.Control type={showOldPassword ? "text" : "password"} placeholder="****" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} onClick={() => setShowOldPassword(!showOldPassword)}>
                {showOldPassword ? <EyeSlashFill /> : <EyeFill />}
              </span>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>Nuova password</Form.Label>
            <div className="position-relative">
              <Form.Control type={showNewPassword ? "text" : "password"} placeholder="****" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <EyeSlashFill /> : <EyeFill />}
              </span>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Conferma password</Form.Label>
            <div className="position-relative">
              <Form.Control type={showConfirmPassword ? "text" : "password"} placeholder="****" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
              </span>
            </div>
          </Form.Group>
          <div className="d-flex gap-1 justify-content-center">
            <Button variant="secondary" className="rounded-pill" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="submit" variant="primary" className="rounded-pill">
              Cambia password
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePassword;
