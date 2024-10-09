import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAllClientsOrders } from "../../redux/actions/orders";
import { Badge, Col, Row } from "react-bootstrap";
import { ArrowLeftCircle, ArrowRight, ArrowRightCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.ordersReducer.clientsOrder);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getAllClientsOrders(page));
  }, [dispatch, page]);

  return (
    <>
      <h3 className="mb-5">Ordini clienti</h3>
      {orders.length > 0 ? (
        orders.map((order: IOrder) => {
          return (
            <div key={order.id}>
              <Row>
                <Col>
                  <p className="line-truncate-2">Order: {order.id}</p>
                  <p>Cliente: {order.user.name}</p>
                  <p>Stato pagamento: {order.payment.status}</p>
                  <p>Data ordine: {order.orderDate}</p>
                  <p>Stato: {order.ordersState}</p>
                </Col>
                <Col className="text-center">
                  <p>Totale</p>
                  <p>{order.payment.total} €</p>
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
          <h3>Pagina vuota!</h3>
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

export default Orders;
