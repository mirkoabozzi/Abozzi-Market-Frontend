import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/actions/products";
import { useNavigate } from "react-router-dom";

const Suggested = () => {
  const dispatch = useAppDispatch();
  const products: IProduct = useAppSelector((state) => state.productReducer.products);
  const isLoading: boolean = useAppSelector((state) => state.productReducer.isLoading);
  const [randomProducts, setRandomProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts.slice(0, 4);
      setRandomProducts(selectedProducts);
    }
  }, [products]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="mt-4">
      <h2>Prodotti consigliati</h2>
      <Row>
        {isLoading ? (
          <Spinner animation="grow" />
        ) : (
          randomProducts.map((product: IProduct) => (
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
          ))
        )}
      </Row>
    </div>
  );
};

export default Suggested;
