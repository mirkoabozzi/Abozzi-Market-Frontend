import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { getProduct } from "../../redux/actions/products";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { getReview } from "../../redux/actions/reviews";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) => state.productReducer.product);
  const reviews = useSelector((state: RootState) => state.reviewsReducer.reviews);

  useEffect(() => {
    dispatch(getProduct(params.id));
    dispatch(getReview(params.id));
  }, [dispatch, params.id]);

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Image src={product?.imgUrl} className="w-100" />
        </Col>
        <Col>
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
          <p>{product?.category.name}</p>
          <p className="fs-2">{product?.price} €</p>
          <div className="d-felx gap-1">
            <Button className="m-1">Aggiungi al carrello</Button>
            <Button className="m-1">Recensisci prodotto</Button>
          </div>
          <p>Disponibili: Pz. {product?.quantityAvailable}</p>
          <p>{product?.lastUpdate}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Recensioni</h3>
          {reviews.length > 0 ? (
            reviews.map((review: IReview) => {
              return (
                <>
                  <Row key={review.id}>
                    <Col>
                      <p>
                        {review.user.name} il <span>{review.updatedAt}</span>
                      </p>
                      <p>Voto: {review.rating}</p>
                      <p>{review.comment}</p>
                    </Col>
                  </Row>
                  <hr />
                </>
              );
            })
          ) : (
            <p>Nessuna recensione disponibile</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
