import { Col, Container, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, ListStars, PersonCircle, Signpost2 } from "react-bootstrap-icons";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col xs={2}>
          <div onClick={() => navigate("/profile")} className="d-flex align-items-center mb-5 mouseHover">
            <Box size={25} />
            <h5 className="mb-0 ms-2 d-none d-lg-block">I miei ordini</h5>
          </div>
          <div onClick={() => navigate("/profile/update")} className="d-flex align-items-center mb-5 mouseHover">
            <PersonCircle size={25} />
            <h5 className="mb-0 ms-2 d-none d-lg-block">Aggiorna profilo</h5>
          </div>
          <div onClick={() => navigate("/profile/address")} className="d-flex align-items-center mb-5 mouseHover">
            <Signpost2 size={25} />
            <h5 className="mb-0 ms-2 d-none d-lg-block">I miei indirizzi</h5>
          </div>
          <div onClick={() => navigate("/profile/wishlist")} className="d-flex align-items-center mb-5 mouseHover">
            <ListStars size={25} />
            <h5 className="mb-0 ms-2 d-none d-lg-block">Lista dei desideri</h5>
          </div>
        </Col>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
