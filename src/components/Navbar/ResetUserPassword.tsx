import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useAppDispatch } from "../../redux/store";
import { resetUserPassword } from "../../redux/actions/user";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ActionType } from "../../redux/enums/ActionType";

const ResetUserPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    dispatch({ type: ActionType.SET_IS_LOGGED_FALSE });
    dispatch({ type: ActionType.SET_USER, payload: null });
  }, [dispatch]);

  useEffect(() => {
    const path = window.location.pathname;
    const userIdFromPath = path.split("userId=")[1];
    if (userIdFromPath) {
      setUserId(userIdFromPath);
    }
  }, [userId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetUserPassword(userId, password));
    navigate("/");
  };

  return (
    <Container className="mt-4">
      <h1>Cambio password</h1>
      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Nuova password</Form.Label>
            <div className="position-relative">
              <Form.Control type={showPassword ? "text" : "password"} placeholder="****" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }} onClick={togglePassword}>
                {showPassword ? <EyeSlashFill /> : <EyeFill />}{" "}
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
