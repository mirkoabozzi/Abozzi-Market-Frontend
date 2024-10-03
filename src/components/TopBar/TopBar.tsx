import { Container } from "react-bootstrap";

const TopBar = () => {
  return (
    <Container fluid className="text-white text-center d-flex justify-content-between align-items-center" style={{ backgroundColor: "#1A51BF" }}>
      <small className="mb-0">Via San Giacomo, 35 &#183; 079587033 </small>
      <small>Via Nazionale, 35 &#183; 079588777</small>
    </Container>
  );
};

export default TopBar;
