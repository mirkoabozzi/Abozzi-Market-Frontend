import { useEffect, useState } from "react";
import { Alert, Badge, Col, Collapse, Container, Dropdown, Row, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getProductByCategory, getProductByDiscount, getProductByName, getProductByPriceRange, getProducts } from "../../redux/actions/products";
import Sidebar from "./Sidebar";
import { ArrowLeftCircle, ArrowRightCircle, ExclamationCircleFill, List, XLg } from "react-bootstrap-icons";
import ProductCard from "../ProductCard/ProductCard";
import { useLocation } from "react-router-dom";
import { viewType } from "../../redux/slice/viewSlice.ts";
import MetaTags from "../MetaTags.tsx";

const Shop = () => {
  const dispatch = useAppDispatch();
  const products: IProductsInterface = useAppSelector((state) => state.productReducer.products);
  const isLoading: boolean = useAppSelector((state) => state.productReducer.isLoading);
  const selectedView: viewType = useAppSelector((state) => state.view?.selectedView);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const location = useLocation();
  const category: string = location.state?.category || "";
  const mainSearch: string = location.state?.mainSearch || "";

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setPage(0);
  }, [selectedView]);

  const pageHandler = (page: number) => {
    switch (selectedView) {
      case "category":
        dispatch(getProductByCategory(category, page, size));
        break;
      case "discount":
        dispatch(getProductByDiscount(page, size));
        break;
      case "priceRange":
        dispatch(getProductByPriceRange(min, max, page, size));
        break;
      case "mainSearch":
        dispatch(getProductByName(mainSearch, page, size));
        break;
      default:
        dispatch(getProducts(page, size));
    }
  };

  useEffect(() => {
    pageHandler(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const handleSize = (size: number) => {
    setPage(0);
    setSize(size);
  };

  return (
    <Container className="mt-4 mainAnimation">
      <MetaTags title="Shop" description="Scegli il prodotto che preferisci e aggiungilo al carrello." />
      <Row>
        <Col sm={2}>
          <div className="d-none d-md-block">
            <Sidebar setPage={setPage} setMinRange={setMin} setMaxRange={setMax} />
          </div>
        </Col>
        <Col sm={12} md={10}>
          <h1>Shop</h1>
          <div className="d-md-none">
            {open ? (
              <XLg className="mb-3 mainAnimation" width={30} height={30} onClick={() => setOpen(!open)} />
            ) : (
              <List className="mb-3 mainAnimation" width={30} height={30} onClick={() => setOpen(!open)} aria-controls="collapse" aria-expanded={open} />
            )}
            <Collapse in={open} className="mb-3">
              <div id="collapse">
                <Sidebar setPage={setPage} setMinRange={setMin} setMaxRange={setMax} handleClose={handleClose} />
              </div>
            </Collapse>
          </div>
          <Dropdown drop={"down-centered"} className="d-flex flex-column flex-sm-row justify-content-end mb-3">
            <Dropdown.Toggle variant="primary" id="dropdown-basic" className="py-1 rounded-5">
              {size === 0 ? "Articoli per pagina" : size}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="custom-dropdown-item" onClick={() => handleSize(4)}>
                4
              </Dropdown.Item>
              <Dropdown.Item className="custom-dropdown-item" onClick={() => handleSize(8)}>
                8
              </Dropdown.Item>
              <Dropdown.Item className="custom-dropdown-item" onClick={() => handleSize(12)}>
                12
              </Dropdown.Item>
              <Dropdown.Item className="custom-dropdown-item" onClick={() => handleSize(24)}>
                24
              </Dropdown.Item>
              <Dropdown.Item className="custom-dropdown-item" onClick={() => handleSize(48)}>
                48
              </Dropdown.Item>
              <Dropdown.Item className="custom-dropdown-item" onClick={() => handleSize(96)}>
                96
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Row>
            {isLoading ? (
              <div className="d-flex justify-content-center mt-4">
                <Spinner />
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
              <div className="text-center">
                <Alert>
                  <ExclamationCircleFill className="me-2" />
                  Nessun risultato!
                </Alert>
              </div>
            )}
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
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
