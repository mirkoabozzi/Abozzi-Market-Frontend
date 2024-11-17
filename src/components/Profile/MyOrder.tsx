import AOS from "aos";
import "aos/dist/aos.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { getMyOrders, orderStatusConverter } from "../../redux/actions/orders";
import { Alert, Badge, Button, Col, Row, Spinner } from "react-bootstrap";
import { ArrowLeftCircle, ArrowRight, ArrowRightCircle, ExclamationCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { dateConverter } from "../../redux/actions/products";

const MyOrder = () => {
  const orders: IOrdersInterface = useAppSelector((state) => state.ordersReducer.orders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getMyOrders(page, navigate, setIsLoading));
  }, [dispatch, page, navigate]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="mainAnimation">
      <h3 className="mb-4">I miei ordini</h3>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      ) : (
        <div>
          {orders?.content?.length > 0 ? (
            orders?.content?.map((order: IOrder) => {
              return (
                <div key={order.id}>
                  <Row data-aos="fade-zoom-in">
                    <Col xs={7}>
                      <p className="text-truncate">Order: {order.id}</p>
                      <p>Data: {dateConverter(order.orderDate)}</p>
                      <p>
                        Stato: <strong>{orderStatusConverter(order.ordersState)}</strong>
                      </p>
                    </Col>
                    <Col className="text-center">
                      <p>Totale</p>
                      <p>€ {order.payment.total.toFixed(2)}</p>
                    </Col>
                    <Col className="text-end">
                      <ArrowRight title="Dettagli ordine" className="mouseHover scale" size={25} onClick={() => navigate(`/profile/orders/details/${order.id}`)} />
                    </Col>
                  </Row>
                  <hr />
                </div>
              );
            })
          ) : (
            <div className="text-center">
              <Alert>
                <ExclamationCircleFill className="me-2" />
                Hey, non hai abbastanza ordini, corri allo shop e inizia a fare acquisti!
              </Alert>
              <div className="d-flex flex-column flex-sm-row justify-content-sm-center">
                <Button type="button" className="rounded-pill" onClick={() => navigate("/shop")}>
                  Shop
                </Button>
              </div>
            </div>
          )}
          {orders?.content?.length > 0 ? (
            <Row className="text-center mt-5">
              <Col>
                {page > 0 ? (
                  <ArrowLeftCircle className="mouseHover scale" width={30} height={30} onClick={() => setPage(page - 1)} />
                ) : (
                  <ArrowLeftCircle width={30} height={30} style={{ opacity: 0.5 }} />
                )}
              </Col>
              <Col>
                <Badge className="fs-6 rounded-pill">
                  {page + 1}
                  {" / "} {orders?.totalPages}
                </Badge>
              </Col>
              <Col>
                {orders?.totalPages !== page + 1 ? (
                  <ArrowRightCircle className="mouseHover scale" width={30} height={30} onClick={() => setPage(page + 1)} />
                ) : (
                  <ArrowRightCircle width={30} height={30} style={{ opacity: 0.5 }} />
                )}
              </Col>
            </Row>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
