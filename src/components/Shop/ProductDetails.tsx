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
import { addToWishlist, getMyWishlists, removeFromWishlist } from "../../redux/actions/wishlists";
import ProductUpdate from "./ProductUpdate";

const Product = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const product: IProduct = useAppSelector((state: RootState) => state.productReducer.product);
  const reviews: IReview[] = useAppSelector((state: RootState) => state.reviewsReducer.reviews);
  const isLogged: boolean = useAppSelector((state: RootState) => state.userReducer.isLogged);
  const wishlist: IWishlist[] = useAppSelector((state: RootState) => state.wishlistsReducer.wishlist);
  const user: IUser = useAppSelector((state) => state.userReducer.user);

  const [show, setShow] = useState(false);

  const [showProductUpdate, setShowProductUpdate] = useState(false);
  const handleShowProductUpdate = () => setShowProductUpdate(true);
  const handleCloseProductUpdate = () => setShowProductUpdate(false);

  const notifyError = (text: string) => {
    toast.error(text, {
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
      notifyError("Devi fare il login per lasciare una recensione!");
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
          <p className="fs-2">{product?.price} €</p>
          <div className="d-felx gap-1">
            <Button className="m-1">Aggiungi al carrello</Button>
            <Button className="m-1" onClick={handleShow}>
              Recensisci prodotto
            </Button>
            {user?.role === "ADMIN" ? (
              <Button onClick={handleShowProductUpdate} className="m-1">
                Modifica Prodotto
              </Button>
            ) : (
              ""
            )}
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
      <ProductUpdate show={showProductUpdate} handleClose={handleCloseProductUpdate} />
      <ToastContainer />
    </Container>
  );
};

export default Product;
