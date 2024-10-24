import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useAppDispatch } from "../../redux/store";
import { resetUserPassword } from "../../redux/actions/user";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ActionType } from "../../redux/enums/ActionType";
import { errorToast } from "../../redux/actions/toaster";

const ResetUserPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    dispatch({ type: ActionType.SET_IS_LOGGED_FALSE });
    dispatch({ type: ActionType.SET_USER, payload: null });
  }, [dispatch]);

  useEffect(() => {
    const path = window.location.pathname;
    const tokenFromPath = path.split("token=")[1];
    if (tokenFromPath) {
      setToken(tokenFromPath);
    }
  }, [token]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      errorToast("Le password non corrispondono");
    } else {
      dispatch(resetUserPassword(token, password));
      navigate("/");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Cambio password</h2>
      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>Nuova password</Form.Label>
            <div className="position-relative">
              <Form.Control type={showPassword ? "text" : "password"} placeholder="****" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashFill /> : <EyeFill />}{" "}
              </span>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="FormConfirmPassword">
            <Form.Label>Conferma password</Form.Label>
            <div className="position-relative">
              <Form.Control type={showConfirmPassword ? "text" : "password"} placeholder="****" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
              </span>
            </div>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button type="submit" variant="primary" className="rounded-pill">
              Cambia password
            </Button>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default ResetUserPassword;
