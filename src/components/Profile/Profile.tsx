import { Col, Container, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Boxes, Collection, ListStars, PersonCircle, PersonLinesFill, Signpost2 } from "react-bootstrap-icons";
import { useAppSelector } from "../../redux/store";

const Profile = () => {
  const navigate = useNavigate();
  const user: IUser = useAppSelector((state) => state.userReducer.user);
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
          <div onClick={() => navigate("/profile/wishlist")} className="d-flex align-items-center mb-5 mouseHover">
            <ListStars size={25} />
            <h5 className="mb-0 ms-2 d-none d-lg-block">Lista dei desideri</h5>
          </div>
          <div onClick={() => navigate("/profile/address")} className="d-flex align-items-center mb-5 mouseHover">
            <Signpost2 size={25} />
            <h5 className="mb-0 ms-2 d-none d-lg-block">Indirizzi</h5>
          </div>

          {/* ADMIN SECTION */}
          {user?.role === "ADMIN" ? (
            <>
              <div onClick={() => navigate("/profile/addProduct")} className="d-flex align-items-center mb-5 mouseHover">
                <Collection size={25} />
                <h5 className="mb-0 ms-2 d-none d-lg-block">Prodotti</h5>
              </div>
              <div onClick={() => navigate("/profile/clients")} className="d-flex align-items-center mb-5 mouseHover">
                <PersonLinesFill size={25} />
                <h5 className="mb-0 ms-2 d-none d-lg-block">Clienti</h5>
              </div>
              <div onClick={() => navigate("/profile/clientsOrders")} className="d-flex align-items-center mb-5 mouseHover">
                <Boxes size={25} />
                <h5 className="mb-0 ms-2 d-none d-lg-block">Ordini</h5>
              </div>
              <div onClick={() => navigate("/profile/category")} className="d-flex align-items-center mb-5 mouseHover">
                <ListStars size={25} />
                <h5 className="mb-0 ms-2 d-none d-lg-block">Categorie</h5>
              </div>

              <div onClick={() => navigate("/profile/promo")} className="d-flex align-items-center mb-5 mouseHover">
                <ListStars size={25} />
                <h5 className="mb-0 ms-2 d-none d-lg-block">Promozioni</h5>
              </div>
            </>
          ) : (
            ""
          )}
        </Col>
        <Col xs={10}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
