import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getMyWishlists } from "../../redux/actions/wishlists";
import { Badge, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const wishlist: IWishlist[] = useAppSelector((state) => state.wishlistsReducer.wishlist);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMyWishlists());
  }, [dispatch]);

  return (
    <div className="mainAnimation">
      <h3>Lista dei desideri</h3>
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
          <h4>Non hai nessun prodotto nella lista dei desideri!</h4>
        )}
      </Row>
    </div>
  );
};

export default WishList;
