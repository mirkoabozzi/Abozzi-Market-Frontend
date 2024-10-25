import AOS from "aos";
import "aos/dist/aos.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { getMyOrders } from "../../redux/actions/orders";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { ArrowLeftCircle, ArrowRight, ArrowRightCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { dateConverter } from "../../redux/actions/products";

const MyOrder = () => {
  const orders: IOrder[] = useAppSelector((state) => state.ordersReducer.orders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getMyOrders(page, navigate));
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
      {orders?.length > 0 ? (
        orders?.map((order: IOrder) => {
          return (
            <div key={order.id}>
              <Row data-aos="fade-zoom-in">
                <Col>
                  <p className="line-truncate-2">Order: {order.id}</p>
                  <p>Data: {dateConverter(order.orderDate)}</p>
                  <p>Stato: {order.ordersState}</p>
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
          <h3 className="mb-5">Hey, non hai abbastanza ordini, corri allo shop e inizia a fare acquisti!</h3>
          <Button onClick={() => navigate("/shop")}>Shop</Button>
        </div>
      )}
      <Row className="text-center mt-5">
        <Col>
          {page > 0 ? <ArrowLeftCircle className="mouseHover scale" width={30} height={30} onClick={() => setPage(page - 1)} /> : <ArrowLeftCircle width={30} height={30} style={{ opacity: 0.5 }} />}
        </Col>
        <Col>
          <Badge className="fs-6 rounded-pill">{page}</Badge>
        </Col>
        <Col>
          {orders.length > 0 ? (
            <ArrowRightCircle className="mouseHover scale" width={30} height={30} onClick={() => setPage(page + 1)} />
          ) : (
            <ArrowRightCircle width={30} height={30} style={{ opacity: 0.5 }} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MyOrder;
