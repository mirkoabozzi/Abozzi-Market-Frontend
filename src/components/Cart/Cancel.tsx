import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <Container className="mainAnimation mt-5 rounded-4 text-center">
      <h1 className="mb-5">Hai annullato il pagamento.</h1>
      <div className="d-flex flex-column flex-sm-row justify-content-sm-center">
        <Button className="rounded-pill" onClick={() => navigate("/")}>
          Torna alla Home
        </Button>
      </div>
    </Container>
  );
};

export default Cancel;
