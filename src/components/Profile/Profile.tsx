import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import MyOrder from "./MyOrder";
import MyAddress from "./MyAddress";
import WishList from "./WishList";
import { Box, ListStars, PersonCircle, Signpost2 } from "react-bootstrap-icons";

const Profile = () => {
  const [showOrder, setShowOrder] = useState(true);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showMyAddress, setShowMyAddress] = useState(false);
  const [showMyWishlist, setShowMyWishlist] = useState(false);

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <div
            className="d-flex align-items-center mb-5 mouseHover"
            onClick={() => {
              setShowUpdateProfile(false);
              setShowOrder(true);
              setShowMyAddress(false);
              setShowMyWishlist(false);
            }}
          >
            <Box size={25} />
            <h5 className="mb-0 ms-2 d-none d-lg-block">I miei ordini</h5>
          </div>

          <div
            className="d-flex align-items-center mb-5 mouseHover"
            onClick={() => {
              setShowUpdateProfile(true);
              setShowOrder(false);
              setShowMyAddress(false);
              setShowMyWishlist(false);
            }}
          >
            <PersonCircle size={25} />
            <h5 className="mb-0 ms-2 d-none d-lg-block">Aggiorna profilo</h5>
          </div>

          <div
            className="d-flex align-items-center mb-5 mouseHover"
            onClick={() => {
              setShowUpdateProfile(false);
              setShowOrder(false);
              setShowMyWishlist(false);
              setShowMyAddress(true);
            }}
          >
            <Signpost2 size={25} />
            <h5 className="mb-0 ms-2 d-none d-lg-block">I miei indirizzi</h5>
          </div>

          <div
            className="d-flex align-items-center mb-5 mouseHover"
            onClick={() => {
              setShowUpdateProfile(false);
              setShowOrder(false);
              setShowMyAddress(false);
              setShowMyWishlist(true);
            }}
          >
            <ListStars size={25} />
            <h5 className="mb-0 ms-2 d-none d-lg-block">Lista dei desideri</h5>
          </div>
        </Col>
        <Col>
          {showOrder && <MyOrder />}
          {showUpdateProfile && <UpdateProfile />}
          {showMyAddress && <MyAddress />}
          {showMyWishlist && <WishList />}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
