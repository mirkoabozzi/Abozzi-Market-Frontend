import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Container className="mainContainer mt-5 rounded-4 text-center">
      <h1>404 Pagina non trovata!</h1>
      <Button variant="outline-primary" onClick={() => navigate("/")}>
        Torna alla Home
      </Button>
    </Container>
  );
}
export default NotFound;
