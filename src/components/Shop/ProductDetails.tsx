import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { dataConverter, getProduct, handleDiscountPrice } from "../../redux/actions/products";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { getReview } from "../../redux/actions/reviews";
import AddReview from "./AddReview";
import { ToastContainer } from "react-toastify";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { addToWishlist, getMyWishlists, removeFromWishlist } from "../../redux/actions/wishlists";
import ProductUpdate from "./ProductUpdate";
import { ActionType } from "../../redux/enums/ActionType";
import { successToast, warnToast } from "../../redux/actions/toaster";

const Product = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const product: IProduct = useAppSelector((state: RootState) => state.productReducer.product);
  const reviews: IReview[] = useAppSelector((state: RootState) => state.reviewsReducer.reviews);
  const isLogged: boolean = useAppSelector((state: RootState) => state.userReducer.isLogged);
  const wishlist: IWishlist[] = useAppSelector((state: RootState) => state.wishlistsReducer.wishlist);
  const user: IUser = useAppSelector((state) => state.userReducer.user);
  const cart: IItem[] = useAppSelector((state) => state.cartReducer.content);

  const [quantity, setQuantity] = useState(1);

  const [show, setShow] = useState(false);

  const [showProductUpdate, setShowProductUpdate] = useState(false);
  const handleShowProductUpdate = () => setShowProductUpdate(true);
  const handleCloseProductUpdate = () => setShowProductUpdate(false);

  const handleShow = () => {
    if (isLogged) {
      setShow(true);
    } else {
      setShow(false);
      warnToast("Devi fare il login per lasciare una recensione!");
    }
  };
  const handleClose = () => setShow(false);

  const handleAddToWishlist = () => {
    if (params.id) {
      dispatch(addToWishlist({ product: params.id }));
    }
  };

  const handleRemoveFromWishlist = () => {
    if (params.id) {
      dispatch(removeFromWishlist(params.id));
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getProduct(params.id));
      dispatch(getReview(params.id));
      dispatch(getMyWishlists());
    }
  }, [dispatch, params.id]);

  const handleAddToCart = () => {
    const existingCartItem = cart.find((item: IItem) => item.product.id === product.id);
    if (existingCartItem) {
      dispatch({ type: ActionType.UPDATE_QUANTITY, payload: { product: product, quantity: existingCartItem.quantity + quantity } });
    } else {
      dispatch({ type: ActionType.ADD_TO_CART, payload: { product, quantity } });
    }
    setQuantity(1);
    successToast("Articolo aggiunto");
  };

  return (
    <Container>
      <Row>
        <Col sm={4} className="position-relative">
          <Image src={product?.imgUrl} className="w-100" />
          {wishlist && wishlist.some((item: IWishlist) => item.product.id === product?.id) ? (
            <HeartFill className="heartPosition" onClick={handleRemoveFromWishlist} />
          ) : (
            <Heart className="heartPosition" onClick={handleAddToWishlist} />
          )}
        </Col>
        <Col>
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
          <p>{product?.category.name}</p>

          <p className={!product.discountStatus ? "fs-2" : "fs-2 text-decoration-line-through"}>{product?.price.toFixed(2)} €</p>
          {product.discountStatus ? <p className="fs-1">{handleDiscountPrice(product).toFixed(2)} €</p> : ""}

          <Form.Group style={{ width: "70px" }} controlId="formQuantity">
            <Form.Label>Quantità</Form.Label>
            <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min={1} max={product?.quantityAvailable} />
          </Form.Group>
          <div className="d-flex gap-2 mt-3">
            <Button onClick={handleAddToCart}>Aggiungi al carrello</Button>
            <Button onClick={handleShow}>Recensisci prodotto</Button>
            {user?.role === "ADMIN" ? <Button onClick={handleShowProductUpdate}>Modifica Prodotto</Button> : ""}
          </div>
          <p>Disponibili: Pz. {product?.quantityAvailable}</p>
          <p>{dataConverter(product?.lastUpdate)}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="mt-5">Recensioni</h3>
          {reviews.length > 0 ? (
            reviews.map((review: IReview) => {
              return (
                <Row key={review.id}>
                  <Col>
                    <p>
                      {review.user.name} il <span>{review.updatedAt}</span>
                    </p>
                    <p>Voto: {review.rating}</p>
                    <p>{review.comment}</p>
                  </Col>
                  <hr />
                </Row>
              );
            })
          ) : (
            <p>Nessuna recensione disponibile</p>
          )}
        </Col>
      </Row>

      {/* modal */}
      <AddReview show={show} handleClose={handleClose} />
      <ProductUpdate show={showProductUpdate} handleClose={handleCloseProductUpdate} />
      <ToastContainer />
    </Container>
  );
};

export default Product;
