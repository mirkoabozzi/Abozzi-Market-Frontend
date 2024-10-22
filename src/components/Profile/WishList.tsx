import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getMyWishlists } from "../../redux/actions/wishlists";
import { Col, Image, Row } from "react-bootstrap";
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
      <Row className="text-center mt-5">
        {wishlist.length > 0 ? (
          wishlist.map((item: IWishlist) => {
            return (
              <Col key={item.id}>
                <Image height={100} src={item.product.imgUrl} alt="product image" className="mouseHover" onClick={() => navigate(`/product/details/${item.product.id}`)} />
                <p>{item.product.name}</p>
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
