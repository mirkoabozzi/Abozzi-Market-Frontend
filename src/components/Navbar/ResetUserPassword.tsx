import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { CheckLg, EyeFill, EyeSlashFill, XLg } from "react-bootstrap-icons";
import { useAppDispatch } from "../../redux/store";
import { resetUserPassword } from "../../redux/actions/user";
import { useNavigate } from "react-router-dom";
import { ActionType } from "../../redux/enums/ActionType";
import ReactPasswordChecklist from "react-password-checklist";

const ResetUserPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    dispatch(resetUserPassword(token, password, setIsLoading, navigate));
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
            <ReactPasswordChecklist
              className="mt-3"
              onChange={(isValid) => setIsPasswordValid(isValid)}
              validColor="#1a51bf"
              invalidColor="#b10f0f"
              rules={["minLength", "specialChar", "number", "capital", "lowercase", "match"]}
              minLength={8}
              value={password}
              valueAgain={confirmPassword}
              iconComponents={{
                ValidIcon: <CheckLg className="me-1" width={20} height={20} />,
                InvalidIcon: <XLg className="me-1 text-danger" width={20} height={20} />,
              }}
              messages={{
                minLength: "Minimo 8 caratteri.",
                specialChar: "Caratteri speciali.",
                number: "Numeri.",
                capital: "Maiuscole.",
                lowercase: "Minuscole",
                match: "Corrispondenza.",
              }}
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button type="submit" variant="primary" className="rounded-pill" disabled={!isPasswordValid}>
              {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Cambia password"}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default ResetUserPassword;
