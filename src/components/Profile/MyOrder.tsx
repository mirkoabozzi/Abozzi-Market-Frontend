import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { getMyOrders } from "../../redux/actions/orders";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { ArrowLeftCircle, ArrowRight, ArrowRightCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { dataConverter } from "../../redux/actions/products";

const MyOrder = () => {
  const orders: IOrder[] = useAppSelector((state) => state.ordersReducer.orders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getMyOrders(page));
  }, [dispatch, page]);

  return (
    <>
      <h3 className="mb-5">I miei ordini</h3>
      {orders?.length > 0 ? (
        orders?.map((order: IOrder) => {
          return (
            <div key={order.id}>
              <Row>
                <Col>
                  <p className="line-truncate-2">Order: {order.id}</p>
                  <p>Data: {dataConverter(order.orderDate)}</p>
                  <p>Stato: {order.ordersState}</p>
                </Col>
                <Col className="text-center">
                  <p>Totale</p>
                  <p>€ {order.payment.total.toFixed(2)}</p>
                </Col>
                <Col className="text-end">
                  <ArrowRight title="Dettagli ordine" className="mouseHover" size={25} onClick={() => navigate(`/profile/orders/details/${order.id}`)} />
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
        <Col>{page > 0 ? <ArrowLeftCircle width={30} height={30} onClick={() => setPage(page - 1)} /> : ""}</Col>
        <Col>
          <Badge className="fs-6">{page}</Badge>
        </Col>
        <Col>
          <ArrowRightCircle width={30} height={30} onClick={() => setPage(page + 1)} />
        </Col>
      </Row>
    </>
  );
};

export default MyOrder;
