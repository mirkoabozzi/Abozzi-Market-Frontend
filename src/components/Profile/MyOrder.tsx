import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { getMyOrders } from "../../redux/actions/orders";
import { Button, Col, Row } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const MyOrder = () => {
  const orders = useSelector((state: RootState) => state.ordersReducer.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <>
      <h3 className="mb-5">I miei ordini</h3>
      {orders.length > 0 ? (
        orders.map((order: IOrder) => {
          return (
            <div key={order.id}>
              <Row>
                <Col>
                  <p className="line-truncate-2">Order: {order.id}</p>
                  <p>Stato: {order.ordersState}</p>
                </Col>
                <Col className="text-center">
                  <p>Totale</p>
                  <p>{order.payment.total} €</p>
                </Col>
                <Col className="text-end">
                  <ArrowRight title="Dettagli ordine" className="mouseHover" size={25} onClick={() => navigate(`/order/details/${order.id}`)} />
                </Col>
              </Row>
              <hr />
            </div>
          );
        })
      ) : (
        <div className="text-center">
          <h3>Hey, non hai ancora effettuato ordini, corri allo shop e inizia a fare aquisti!</h3>
          <Button onClick={() => navigate("/shop")}>Shop</Button>
        </div>
      )}
    </>
  );
};

export default MyOrder;
