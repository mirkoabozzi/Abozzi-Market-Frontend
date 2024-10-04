import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import MyOrder from "./MyOrder";
import MyAddress from "./MyAddress";
import WishList from "./WishList";

const Profile = () => {
  const [showUpdateProfile, setShowUpdateProfile] = useState(true);
  const [showOrder, setShowOrder] = useState(false);
  const [showMyAddress, setShowMyAddress] = useState(false);
  const [showMyWishlist, setShowMyWishlist] = useState(false);

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <p
            className=""
            onClick={() => {
              setShowUpdateProfile(true);
              setShowOrder(false);
              setShowMyAddress(false);
              setShowMyWishlist(false);
            }}
          >
            Aggiorna profilo
          </p>
          <p
            className=""
            onClick={() => {
              setShowUpdateProfile(false);
              setShowOrder(true);
              setShowMyAddress(false);
              setShowMyWishlist(false);
            }}
          >
            I miei ordini
          </p>
          <p
            className=""
            onClick={() => {
              setShowUpdateProfile(false);
              setShowOrder(false);
              setShowMyWishlist(false);
              setShowMyAddress(true);
            }}
          >
            I miei indirizzi
          </p>
          <p
            className=""
            onClick={() => {
              setShowUpdateProfile(false);
              setShowOrder(false);
              setShowMyAddress(false);
              setShowMyWishlist(true);
            }}
          >
            La mia lista dei desideri
          </p>
        </Col>
        <Col>
          {showUpdateProfile && <UpdateProfile />}
          {showOrder && <MyOrder />}
          {showMyAddress && <MyAddress />}
          {showMyWishlist && <WishList />}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
