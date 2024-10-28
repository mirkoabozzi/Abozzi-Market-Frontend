import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { dateConverter, getProduct, handleDiscountPrice } from "../../redux/actions/products";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { deleteReview, getReview } from "../../redux/actions/reviews";
import AddReview from "./AddReview";
import { ToastContainer } from "react-toastify";
import { Heart, HeartFill, Pencil, StarFill } from "react-bootstrap-icons";
import { addToWishlist, getMyWishlists, removeFromWishlist } from "../../redux/actions/wishlists";
import ProductUpdate from "./ProductUpdate";
import { ActionType } from "../../redux/enums/ActionType";
import { errorToast, successToast, warnToast } from "../../redux/actions/toaster";
import ReviewUpdate from "./ReviewUpdate";
import ModalAlert from "../ModalAlert/ModalAlert";
import Suggested from "../Home/Suggested";

const Product = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const product: IProduct = useAppSelector((state: RootState) => state.productReducer.product);
  const reviews: IReview[] = useAppSelector((state: RootState) => state.reviewsReducer.reviews);
  const isLogged: boolean = useAppSelector((state: RootState) => state.userReducer.isLogged);
  const wishlist: IWishlist[] = useAppSelector((state: RootState) => state.wishlistsReducer.wishlist);
  const user: IUser = useAppSelector((state) => state.userReducer.user);
  const cart: IItem[] = useAppSelector((state) => state.cartReducer.content);
  const [review, SetReview] = useState<IReview>();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [showAddReview, setShowAddReview] = useState(false);

  const [showProductUpdate, setShowProductUpdate] = useState(false);
  const handleShowProductUpdate = () => setShowProductUpdate(true);
  const handleCloseProductUpdate = () => setShowProductUpdate(false);

  const [showReviewUpdate, setShowReviewUpdate] = useState(false);
  const handleShowReviewUpdate = () => setShowReviewUpdate(true);
  const handleCloseReviewUpdate = () => setShowReviewUpdate(false);

  const handleShowAddReview = () => {
    if (isLogged) {
      setShowAddReview(true);
    } else {
      setShowAddReview(false);
      warnToast("Devi fare il login per lasciare una recensione!");
    }
  };

  const handleCloseAddReview = () => setShowAddReview(false);

  const handleAddToWishlist = () => {
    if (params.id) {
      dispatch(addToWishlist({ product: params.id }));
    }
  };

  const [showModalAlert, setShowModalAlert] = useState(false);
  const handleCloseModalAlert = () => setShowModalAlert(false);
  const handleShowModalAlert = () => {
    handleCloseReviewUpdate();
    setShowModalAlert(true);
  };

  const handleDeleteReview = () => {
    if (review) {
      dispatch(deleteReview(review.id, review.product.id));
      setShowModalAlert(false);
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
    if (existingCartItem && existingCartItem?.product.quantityAvailable <= existingCartItem?.quantity) {
      errorToast("Quantità non disponibile!");
    } else {
      successToast("Articolo aggiunto");
      if (existingCartItem) {
        dispatch({ type: ActionType.UPDATE_QUANTITY, payload: { product: product, quantity: existingCartItem.quantity + quantity } });
      } else {
        dispatch({ type: ActionType.ADD_TO_CART, payload: { product, quantity } });
      }
    }
    setQuantity(1);
  };

  const handleAverageRate = () => {
    if (reviews.length === 0) return 0;
    let value = 0;
    for (let i = 0; i < reviews.length; i++) {
      value += reviews[i].rating;
    }
    return value / reviews.length;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<StarFill key={i} color={i < rating ? "gold" : "gray"} className="mx-1" />);
    }
    return stars;
  };

  useEffect(() => {
    setRating(handleAverageRate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);

  return (
    <Container className="mt-4 mainAnimation">
      {product && (
        <Row>
          <Col sm={4} className="mb-3">
            <div>
              <Image src={product?.imgUrl} className="w-100 object-fit-contain" style={{ maxHeight: "400px" }} />
            </div>
            <div className="d-flex justify-content-end mt-3 me-3">
              {wishlist && wishlist.some((item: IWishlist) => item.product.id === product?.id) ? (
                <HeartFill width={20} height={20} className="mouseHover scale" onClick={handleRemoveFromWishlist} />
              ) : (
                <Heart width={20} height={20} className="mouseHover scale" onClick={handleAddToWishlist} />
              )}
            </div>
          </Col>
          <Col>
            <h2>{product?.name}</h2>
            <p>{product?.description}</p>
            <p>{product?.category.name}</p>

            <div className="my-2">
              <span className="me-2">{rating.toFixed(1)}</span>
              {renderStars(rating)}
            </div>
            <strong className={!product?.discountStatus ? "d-block fs-1 mb-0" : "d-block fs-4 text-decoration-line-through mb-0"}>€ {product?.price.toFixed(2)}</strong>
            {product?.discountStatus ? (
              <>
                <strong className="text-danger fs-2 me-2">-{product?.discountList[0]?.percentage}%</strong>
                <strong className="fs-1 mb-0">€ {handleDiscountPrice(product).toFixed(2)}</strong>
                <p>Termina il: {dateConverter(product.discountList[0].endDate)}</p>
              </>
            ) : null}
            <Form.Label>Quantità</Form.Label>
            <Form.Group className="col-md-2" controlId="formQuantity">
              <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min={1} max={product?.quantityAvailable} />
            </Form.Group>
            <div className="d-flex justify-content-center flex-column flex-md-row gap-2 my-3">
              {product?.quantityAvailable === 0 ? (
                <Button className="rounded-pill" style={{ opacity: 0.5 }}>
                  Esaurito
                </Button>
              ) : (
                <Button className="rounded-pill" onClick={handleAddToCart}>
                  Aggiungi al carrello
                </Button>
              )}
              <Button className="rounded-pill" onClick={handleShowAddReview}>
                Recensisci prodotto
              </Button>
              {user?.role === "ADMIN" ? (
                <Button className="rounded-pill" onClick={handleShowProductUpdate}>
                  Modifica Prodotto
                </Button>
              ) : null}
            </div>
            <p>Disponibili: Pz. {product?.quantityAvailable}</p>
            <p>{dateConverter(product?.lastUpdate)}</p>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Suggested category={product?.category.name} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="mt-5 mb-4">Recensioni</h3>
          {reviews?.length > 0 ? (
            reviews.map((review: IReview) => {
              return (
                <Row key={review.id}>
                  <Col>
                    <p>
                      {review.user.name} il{" "}
                      <span>
                        {dateConverter(review.updatedAt)}{" "}
                        {isLogged && user?.id === review?.user.id && (
                          <Pencil
                            size={20}
                            className="mouseHover scale"
                            onClick={() => {
                              SetReview(review);
                              handleShowReviewUpdate();
                            }}
                          />
                        )}
                      </span>
                    </p>
                    <p>
                      Voto: {review.rating} {renderStars(review.rating)}
                    </p>
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
      <AddReview show={showAddReview} handleClose={handleCloseAddReview} />
      {product && <ProductUpdate show={showProductUpdate} handleClose={handleCloseProductUpdate} />}
      {review && <ReviewUpdate show={showReviewUpdate} handleClose={handleCloseReviewUpdate} review={review} handleShowModalAlert={handleShowModalAlert} />}
      {review && <ModalAlert show={showModalAlert} handleClose={handleCloseModalAlert} handleEvent={handleDeleteReview} />}
      <ToastContainer />
    </Container>
  );
};

export default Product;
