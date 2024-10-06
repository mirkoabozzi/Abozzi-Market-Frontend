import "./Shop.css";
import { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getProducts } from "../../redux/actions/products";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.productReducer.products);
  const isLoading = useSelector((state: RootState) => state.productReducer.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Row>
      <Col xs={2}>{/* <Sidebar /> */}</Col>
      <Col xs={8}>
        <h2>Main</h2>
        <Row>
          {isLoading ? (
            <Spinner animation="grow" />
          ) : (
            products.map((product: IProduct) => {
              return (
                <Col xs="12" sm={6} md={4} lg={3} className="my-3" key={product.id}>
                  <Card className=" rounded-3 h-100">
                    <Card.Img variant="top" src={product.imgUrl} className=" rounded-3" />
                    <Card.Body className="d-flex flex-column justify-content-end">
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="line-truncate-2">{product.description}</Card.Text>
                      <span className="fs-5">{product.price}</span>
                      <div className="d-flex justify-content-end">
                        <Button variant="primary" onClick={() => navigate(`/product/details/${product.id}`)}>
                          Scopri di più
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Col>
    </Row>
  );
};
export default Shop;
