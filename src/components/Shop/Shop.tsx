import "./Shop.css";
import { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { getProducts } from "../../redux/actions/products";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

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
    <Row>
      <Col xs={2}>
        <Sidebar />
      </Col>
      <Col xs={8}>
        <h2>Shop</h2>
        <Row>
          {isLoading ? (
            <Spinner animation="grow" />
          ) : (
            products.map((product: IProduct) => {
              return (
                <Col xs="12" sm={6} md={4} lg={3} className="my-3" key={product.id}>
                  <Card className=" rounded-3 h-100 cardHover">
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
