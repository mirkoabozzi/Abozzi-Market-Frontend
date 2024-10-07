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
    <div>
      <h3>Lista dei desideti</h3>
      <Row className="text-center">
        {wishlist.length > 0 ? (
          wishlist.map((item: IWishlist) => {
            return (
              <Col key={item.id}>
                <Image height={100} src={item.product.imgUrl} alt="product image" className="mouseHover" onClick={() => navigate(`/product/details/${item.product.id}`)} />
                <p>{item.product.name}</p>
                <p>{item.product.price} €</p>
              </Col>
            );
          })
        ) : (
          <p>Non hai nessun prodotto nella wishlist</p>
        )}
      </Row>
    </div>
  );
};

export default WishList;
