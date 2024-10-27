import { useEffect, useState } from "react";
import { Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { getProductByCategory, getProductByDiscount, getProductByPriceRange, getProducts } from "../../redux/actions/products";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";
import ProductCard from "../ProductCard/ProductCard";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const dispatch = useAppDispatch();
  const products: IProduct[] = useAppSelector((state: RootState) => state.productReducer.products);
  const isLoading: boolean = useAppSelector((state: RootState) => state.productReducer.isLoading);
  const productsLoaded: boolean = useAppSelector((state) => state.productReducer.productsLoaded);
  const [page, setPage] = useState(0);
  const [currentView, setCurrentView] = useState<"all" | "discount" | "category" | "priceRange">("all");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const location = useLocation();
  const category: string = location.state?.category || "";

  useEffect(() => {
    setPage(0);
    if (category) {
      setCurrentView("category");
    }
  }, [category]);

  useEffect(() => {
    switch (currentView) {
      case "category":
        if (category) {
          dispatch(getProductByCategory(category, page));
        }
        break;
      case "discount":
        dispatch(getProductByDiscount(page));
        break;
      case "priceRange":
        dispatch(getProductByPriceRange(min, max, page));
        break;
      default:
        if (!productsLoaded) {
          dispatch(getProducts(page));
        }
    }
  }, [dispatch, page, category, currentView, productsLoaded, min, max]);

  return (
    <Container className="mt-4 mainAnimation">
      <Row>
        <Col sm={2}>
          <div className="d-none d-md-block">
            <Sidebar setPage={setPage} setCurrentView={setCurrentView} setMinRange={setMin} setMaxRange={setMax} />
          </div>
        </Col>
        <Col sm={10}>
          <h2>Shop</h2>
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
          {page > 0 ? <ArrowLeftCircle className="mouseHover scale" width={30} height={30} onClick={() => setPage(page - 1)} /> : <ArrowLeftCircle width={30} height={30} style={{ opacity: 0.5 }} />}
        </Col>
        <Col>
          <Badge className="fs-6 rounded-pill">{page + 1}</Badge>
        </Col>
        <Col>
          {products.length > 0 ? (
            <ArrowRightCircle className="mouseHover scale" width={30} height={30} onClick={() => setPage(page + 1)} />
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
