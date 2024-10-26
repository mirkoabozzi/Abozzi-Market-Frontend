import { Col, Row, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { getProductByCategory, getProducts } from "../../redux/actions/products";
import ProductCard from "../ProductCard/ProductCard";

interface SuggestedProps {
  category?: string;
}

const Suggested = ({ category }: SuggestedProps) => {
  const dispatch = useAppDispatch();
  const products: IProduct = useAppSelector((state) => state.productReducer.products);
  const isLoading: boolean = useAppSelector((state) => state.productReducer.isLoading);
  const [randomProducts, setRandomProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts.slice(0, 4);
      setRandomProducts(selectedProducts);
    }
  }, [products]);

  useEffect(() => {
    if (category) {
      const page = 0;
      dispatch(getProductByCategory(category, page));
    } else {
      dispatch(getProducts(0));
    }
  }, [dispatch, category]);

  return (
    <div className="mt-4">
      <h2>Prodotti consigliati</h2>
      <Row>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" />
          </div>
        ) : (
          randomProducts?.map((product: IProduct) => (
            <Col xs={6} md={3} className="my-3" key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Suggested;
