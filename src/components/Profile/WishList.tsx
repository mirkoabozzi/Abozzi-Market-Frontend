import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getMyWishlists } from "../../redux/actions/wishlists";
import { Alert, Badge, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleFill } from "react-bootstrap-icons";

const WishList = () => {
  const wishlist: IWishlist[] = useAppSelector((state) => state.wishlistsReducer.wishlist);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMyWishlists());
  }, [dispatch]);

  return (
    <div className="mainAnimation">
      <h1>Lista dei desideri</h1>
      <Row className="text-center mt-4">
        {wishlist.length > 0 ? (
          wishlist.map((item: IWishlist) => {
            return (
              <Col xs={6} md={4} lg={2} key={item.id} className="mouseHover scale position-relative" onClick={() => navigate(`/product/details/${item.product.id}`)}>
                {item.product.discountStatus && <Badge className="position-absolute z-1">Offerta</Badge>}
                <Image src={item.product.imgUrl} alt={item.product.name} width={100} height={100} className="border rounded-circle object-fit-cover shadow" />
                <p className="mb-0 mt-2">{item.product.name}</p>
                <p>€ {item.product.price.toFixed(2)}</p>
              </Col>
            );
          })
        ) : (
          <div className="text-center">
            <Alert>
              <ExclamationCircleFill className="me-2" />
              Lista dei desideri vuota!
            </Alert>
          </div>
        )}
      </Row>
    </div>
  );
};

export default WishList;
