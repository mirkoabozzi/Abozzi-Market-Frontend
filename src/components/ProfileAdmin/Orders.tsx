import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAllClientsOrders, getOrdersByUserEmail } from "../../redux/actions/orders";
import { Badge, Button, Col, Form, Row } from "react-bootstrap";
import { ArrowLeftCircle, ArrowRight, ArrowRightCircle, Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { dateConverter } from "../../redux/actions/products";

const Orders = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orders: IOrdersInterface = useAppSelector((state) => state.ordersReducer.clientsOrder);
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (email) {
      dispatch(getOrdersByUserEmail(page, email));
    } else {
      dispatch(getAllClientsOrders(page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      dispatch(getOrdersByUserEmail(page, email));
    } else {
      dispatch(getAllClientsOrders(page));
    }
  };

  return (
    <div className="mainAnimation">
      <h3>Ordini clienti</h3>
      <Form className="my-4 d-flex position-relative" onSubmit={handleSubmit}>
        <Form.Control type="email" placeholder="Email cliente" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" variant="transparent" className="position-absolute end-0">
          <Search width={20} height={20} />
        </Button>
      </Form>
      {orders?.content?.length > 0 ? (
        orders?.content?.map((order: IOrder) => {
          return (
            <div key={order.id}>
              <Row data-aos="fade-zoom-in">
                <Col>
                  <p>Order: {order.id}</p>
                  <p>
                    Cliente: {order.user.name} {order.user.surname}
                  </p>
                  <p>Stato pagamento: {order.payment.status}</p>
                  <p>Data ordine: {dateConverter(order.orderDate)}</p>
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
          <h3>Pagina vuota!</h3>
        </div>
      )}
      <Row className="text-center mt-5">
        <Col>
          {page > 0 ? <ArrowLeftCircle className="mouseHover scale" width={30} height={30} onClick={() => setPage(page - 1)} /> : <ArrowLeftCircle width={30} height={30} style={{ opacity: 0.5 }} />}
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
    </div>
  );
};

export default Orders;
