import { useEffect, useState } from "react";
import { Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { getProductByCategory, getProducts } from "../../redux/actions/products";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";
import ProductCard from "../ProductCard/ProductCard";
import { ActionType } from "../../redux/enums/ActionType";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const dispatch = useAppDispatch();
  const products: IProduct[] = useAppSelector((state: RootState) => state.productReducer.products);
  const isLoading: boolean = useAppSelector((state: RootState) => state.productReducer.isLoading);
  const productsLoaded = useAppSelector((state) => state.productReducer.productsLoaded);
  const [page, setPage] = useState(0);

  const location = useLocation();
  const category: string = location.state?.category || "";

  useEffect(() => {
    if (category) {
      dispatch(getProductByCategory(category, page));
    } else if (!productsLoaded) {
      dispatch(getProducts(page));
      dispatch({ type: ActionType.SET_PRODUCTS_LOADED_TRUE });
    }
  }, [dispatch, page, category, productsLoaded]);

  return (
    <Container className="mt-4 mainAnimation">
      <Row>
        <Col sm={2}>
          <div className="d-none d-md-block">
            <Sidebar />
          </div>
        </Col>
        <Col sm={10}>
          <h2>{category ? `${category}` : "Shop"}</h2>
          <Row>
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="grow" />
              </div>
            ) : products.length > 0 ? (
              products.map((product: IProduct) => {
                return (
                  <Col xs={6} md={4} xl={3} className="my-3" key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                );
              })
            ) : (
              <h3 className="text-center">Nessun risultato!</h3>
            )}
          </Row>
        </Col>
      </Row>
      <Row className="text-center mt-5">
        <Col>
          {page > 0 ? (
            <ArrowLeftCircle
              className="mouseHover scale"
              width={30}
              height={30}
              onClick={() => {
                setPage(page - 1);
                dispatch({ type: ActionType.SET_PRODUCTS_LOADED_FALSE });
              }}
            />
          ) : (
            <ArrowLeftCircle width={30} height={30} style={{ opacity: 0.5 }} />
          )}
        </Col>
        <Col>
          <Badge className="fs-6 rounded-pill">{page}</Badge>
        </Col>
        <Col>
          {products.length > 0 ? (
            <ArrowRightCircle
              className="mouseHover scale"
              width={30}
              height={30}
              onClick={() => {
                setPage(page + 1);
                dispatch({ type: ActionType.SET_PRODUCTS_LOADED_FALSE });
              }}
            />
          ) : (
            <ArrowRightCircle width={30} height={30} style={{ opacity: 0.5 }} />
          )}
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};
export default Shop;
