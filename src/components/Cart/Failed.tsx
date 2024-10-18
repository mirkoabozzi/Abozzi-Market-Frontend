import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Failed = () => {
  const navigate = useNavigate();

  return (
    <Container className="mainContainer mt-5 rounded-4 text-center">
      <h1>Qualcosa è andato storto, ci dispiace!</h1>
      <Button variant="outline-primary" className="rounded-pill" onClick={() => navigate("/")}>
        Torna alla Home
      </Button>
    </Container>
  );
};

export default Failed;
