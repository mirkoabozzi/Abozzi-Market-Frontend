import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getUser, url } from "../../redux/actions/user";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { ActionType } from "../../redux/enums/ActionType";
import { useAppDispatch } from "../../redux/store";
import { errorToast } from "../../redux/actions/toaster";
import ResetUserPasswordRequest from "./ResetUserPasswordRequest";

interface LoginProps {
  show: boolean;
  handleClose: () => void;
}

const Login = ({ show, handleClose }: LoginProps) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showResetPassword, setShowResetPassword] = useState(false);
  const handleCloseResetPassword = () => setShowResetPassword(false);

  const handleShowResetPassword = () => {
    setShowResetPassword(true);
    handleClose();
  };

  const loginFetch = async () => {
    try {
      const resp = await fetch(`${url}/authentication/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (resp.ok) {
        const result = await resp.json();
        localStorage.setItem("accessToken", result.accessToken);
        dispatch(getUser());
        dispatch({ type: ActionType.SET_IS_LOGGED_TRUE });
        handleClose();
        setEmail("");
        setPassword("");
      } else {
        errorToast("Login fallito!");
        throw new Error("Login error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    loginFetch();
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
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
              <div className="position-relative">
                <Form.Control type={showPassword ? "text" : "password"} placeholder="****" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} onClick={togglePassword}>
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}{" "}
                </span>
              </div>
            </Form.Group>
            <div className="d-flex gap-1 justify-content-center">
              <Button variant="secondary" className="rounded-pill" onClick={handleClose}>
                Chiudi
              </Button>
              <Button type="submit" variant="primary" className="rounded-pill">
                Accedi
              </Button>
            </div>
            <p className="text-end mb-0 mt-2 mouseHover" onClick={handleShowResetPassword}>
              Password dimenticata?
            </p>
          </Form>
        </Modal.Body>
      </Modal>
      <ResetUserPasswordRequest show={showResetPassword} handleClose={handleCloseResetPassword} />
    </>
  );
};

export default Login;
