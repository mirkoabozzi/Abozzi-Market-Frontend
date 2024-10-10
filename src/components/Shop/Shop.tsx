import "./Shop.css";
import { useEffect } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { getProducts } from "../../redux/actions/products";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { TypeH3 } from "react-bootstrap-icons";

const Shop = () => {
  const dispatch = useAppDispatch();
  const products: IProduct[] = useAppSelector((state: RootState) => state.productReducer.products);
  const isLoading: boolean = useAppSelector((state: RootState) => state.productReducer.isLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length < 0) {
      dispatch(getProducts());
    }
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col sm={2}>
          <div className="d-none d-sm-block">
            <Sidebar />
          </div>
        </Col>
        <Col sm={10}>
          <h2>Shop</h2>
          <Row>
            {isLoading ? (
              <Spinner animation="grow" />
            ) : products.length > 0 ? (
              products.map((product: IProduct) => {
                return (
                  <Col sm={6} md={4} lg={3} xl={2} className="my-3" key={product.id}>
                    <Card className=" rounded-3 h-100 cardHover">
                      <Card.Img variant="top" src={product.imgUrl} className=" rounded-3" />
                      <Card.Body className="d-flex flex-column justify-content-end">
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text className="line-truncate-2">{product.description}</Card.Text>
                        <span className="fs-5">{product.price.toFixed(2)} €</span>
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
            ) : (
              <h3 className="text-center">Nessun risultato!</h3>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Shop;
