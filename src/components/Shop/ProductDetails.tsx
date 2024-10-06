import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { getProduct } from "../../redux/actions/products";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

const Product = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) => state.productReducer.product);

  useEffect(() => {
    dispatch(getProduct(params.id));
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
          <Button>Aggiungi al carrello</Button>
          <Button>Recensisci prodotto</Button>
          <p>Disponibili: Pz. {product?.quantityAvailable}</p>
          <p>{product?.lastUpdate}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Recensioni</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
