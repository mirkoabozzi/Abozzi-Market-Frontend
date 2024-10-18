import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getUser, url } from "../../redux/actions/user";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { ActionType } from "../../redux/enums/ActionType";
import { useAppDispatch } from "../../redux/store";
import { errorToast } from "../../redux/actions/toaster";
import { ToastContainer } from "react-toastify";

interface LoginProps {
  show: boolean;
  handleClose: () => void;
}

const Login = ({ show, handleClose }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

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
      <ToastContainer />
    </Modal>
  );
};

export default Login;
