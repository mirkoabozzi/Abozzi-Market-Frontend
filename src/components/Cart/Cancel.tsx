import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <Container className="mainContainer mt-5 rounded-4 text-center">
      <h1>Hai annullato il pagamento!</h1>
      <Button variant="outline-primary" onClick={() => navigate("/")}>
        Torna alla Home
      </Button>
    </Container>
  );
};

export default Cancel;
