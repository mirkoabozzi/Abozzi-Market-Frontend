import { useEffect, useState } from "react";
import { Badge, Col, Collapse, Container, Row, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getProductByCategory, getProductByDiscount, getProductByName, getProductByPriceRange, getProducts } from "../../redux/actions/products";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import { ArrowLeftCircle, ArrowRightCircle, List, XLg } from "react-bootstrap-icons";
import ProductCard from "../ProductCard/ProductCard";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const dispatch = useAppDispatch();
  const products: IProductsInterface = useAppSelector((state) => state.productReducer.products);
  const isLoading: boolean = useAppSelector((state) => state.productReducer.isLoading);
  const currentView = useAppSelector((state) => state.view?.selectedView);
  const [page, setPage] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const location = useLocation();
  const category: string = location.state?.category || "";
  const mainSearch: string = location.state?.mainSearch || "";

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setPage(0);
  }, [currentView]);

  const pageHandler = (page: number) => {
    switch (currentView) {
      case "category":
        dispatch(getProductByCategory(category, page));
        break;
      case "discount":
        dispatch(getProductByDiscount(page));
        break;
      case "priceRange":
        dispatch(getProductByPriceRange(min, max, page));
        break;
      case "mainSearch":
        dispatch(getProductByName(mainSearch, page));
        break;
      default:
        dispatch(getProducts(page));
    }
  };

  return (
    <Container className="mt-4 mainAnimation">
      <Row>
        <Col sm={2}>
          <div className="d-none d-md-block">
            <Sidebar setPage={setPage} setMinRange={setMin} setMaxRange={setMax} />
          </div>
        </Col>
        <Col sm={12} md={10}>
          <h2>Shop</h2>
          <div className="d-md-none">
            {open ? (
              <XLg className="mb-3 mainAnimation" width={30} height={30} onClick={() => setOpen(!open)} />
            ) : (
              <List className="mb-3 mainAnimation" width={30} height={30} onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} />
            )}
            <Collapse in={open} className="mb-3">
              <div id="example-collapse-text">
                <Sidebar setPage={setPage} setMinRange={setMin} setMaxRange={setMax} handleClose={handleClose} />
              </div>
            </Collapse>
          </div>
          <Row>
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="grow" />
              </div>
            ) : products?.content?.length > 0 ? (
              products?.content?.map((product: IProduct) => {
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
      {products?.content?.length > 0 ? (
        <Row className="text-center mt-5">
          <Col>
            {page > 0 ? (
              <ArrowLeftCircle
                className="mouseHover scale"
                width={30}
                height={30}
                onClick={() => {
                  setPage(page - 1);
                  pageHandler(page - 1);
                }}
              />
            ) : (
              <ArrowLeftCircle width={30} height={30} style={{ opacity: 0.5 }} />
            )}
          </Col>
          <Col>
            <Badge className="fs-6 rounded-pill">
              {page + 1}
              {" / "} {products?.totalPages}
            </Badge>
          </Col>
          <Col>
            {products?.totalPages !== page + 1 ? (
              <ArrowRightCircle
                className="mouseHover scale"
                width={30}
                height={30}
                onClick={() => {
                  setPage(page + 1);
                  pageHandler(page + 1);
                }}
              />
            ) : (
              <ArrowRightCircle width={30} height={30} style={{ opacity: 0.5 }} />
            )}
          </Col>
        </Row>
      ) : null}
      <ToastContainer />
    </Container>
  );
};

export default Shop;
