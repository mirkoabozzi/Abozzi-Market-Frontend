import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Failed = () => {
  const navigate = useNavigate();

  return (
    <Container className="mainAnimation mt-5 rounded-4 text-center">
      <h1>Qualcosa è andato storto, ci dispiace!</h1>
      <h3 className="mb-5">Contattaci per avere supporto.</h3>
      <div className="d-flex flex-column flex-sm-row justify-content-sm-center">
        <Button className="rounded-pill" onClick={() => navigate("/")}>
          Torna alla Home
        </Button>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Failed;
