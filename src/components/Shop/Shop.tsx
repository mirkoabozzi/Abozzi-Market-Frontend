import "./Shop.css";
import { useEffect, useState } from "react";
import { Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { getProducts } from "../../redux/actions/products";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";
import ProductCard from "../ProductCard/ProductCard";
import { ActionType } from "../../redux/enums/ActionType";

const Shop = () => {
  const dispatch = useAppDispatch();
  const products: IProduct[] = useAppSelector((state: RootState) => state.productReducer.products);
  const isLoading: boolean = useAppSelector((state: RootState) => state.productReducer.isLoading);
  const productsLoaded = useAppSelector((state) => state.productReducer.productsLoaded);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(getProducts(page));
      dispatch({ type: ActionType.SET_PRODUCTS_LOADED_TRUE });
    }
  }, [dispatch, page, productsLoaded]);

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
              width={30}
              height={30}
              onClick={() => {
                setPage(page - 1);
                dispatch({ type: ActionType.SET_PRODUCTS_LOADED_FALSE });
              }}
            />
          ) : (
            ""
          )}
        </Col>
        <Col>
          <Badge className="fs-6">{page}</Badge>
        </Col>
        <Col>
          <ArrowRightCircle
            width={30}
            height={30}
            onClick={() => {
              setPage(page + 1);
              dispatch({ type: ActionType.SET_PRODUCTS_LOADED_FALSE });
            }}
          />
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};
export default Shop;
