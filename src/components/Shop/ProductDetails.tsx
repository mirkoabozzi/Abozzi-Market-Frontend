import "react-toastify/dist/ReactToastify.css";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { getProduct } from "../../redux/actions/products";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { getReview } from "../../redux/actions/reviews";
import AddReview from "./AddReview";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlists";

const Product = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const product = useAppSelector((state: RootState) => state.productReducer.product);
  const reviews = useAppSelector((state: RootState) => state.reviewsReducer.reviews);
  const isLogged = useAppSelector((state: RootState) => state.userReducer.isLogged);
  const wishlist = useAppSelector((state: RootState) => state.wishlistsReducer.wishlist);

  const [show, setShow] = useState(false);

  const notifyError = () => {
    toast.error("Devi fare il login per lasciare una recensione!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleShow = () => {
    if (isLogged) {
      setShow(true);
    } else {
      setShow(false);
      notifyError();
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
    }
  }, [dispatch, params.id]);

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Image src={product?.imgUrl} className="w-100 position-relative" />
          {wishlist.some((item: IWishlist) => item.product.id === product.id) ? (
            <HeartFill className="position-absolute" onClick={handleRemoveFromWishlist} />
          ) : (
            <Heart className="position-absolute" onClick={handleAddToWishlist} />
          )}
        </Col>
        <Col>
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
          <p>{product?.category.name}</p>
          <p className="fs-2">{product?.price} €</p>
          <div className="d-felx gap-1">
            <Button className="m-1">Aggiungi al carrello</Button>
            <Button className="m-1" onClick={handleShow}>
              Recensisci prodotto
            </Button>
          </div>
          <p>Disponibili: Pz. {product?.quantityAvailable}</p>
          <p>{product?.lastUpdate}</p>
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
      <ToastContainer />
    </Container>
  );
};

export default Product;
