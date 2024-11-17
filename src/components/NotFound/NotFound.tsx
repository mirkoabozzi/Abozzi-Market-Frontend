import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Container className="mainAnimation mt-5 rounded-4 text-center">
      <h1>404 Pagina non trovata!</h1>
      <Button type="button" className="rounded-pill" onClick={() => navigate("/")}>
        Torna alla Home
      </Button>
    </Container>
  );
}
export default NotFound;
