import { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../../redux/actions/orders";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { handleDiscount } from "../../redux/actions/products";

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const order: IOrder = useAppSelector((state) => state.ordersReducer.order);

  useEffect(() => {
    if (params.id) {
      dispatch(getOrder(params.id));
    }
  }, [params.id, dispatch]);

  return (
    <Container>
      <h4 className="mb-5">Ordine: {order?.id}</h4>
      <Row className="mb-5">
        <Col xs={4}>
          <p>Data ordine: {order?.orderDate}</p>
        </Col>
        <Col>
          <p>Stato ordine: {order?.ordersState}</p>
        </Col>
        <Col>
          <p>Pagamento: {order?.payment.status}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Articolo</p>
        </Col>
        <Col>
          <p>Quantità</p>
        </Col>
        <Col>
          <p>Prezzo unità</p>
        </Col>
        <Col>
          <p>Totale</p>
        </Col>
      </Row>
      <hr />
      {order?.orderDetailList.map((item: OrderDetailListItem) => {
        return (
          <div key={item.id}>
            <Row>
              <Col>
                <Image height={100} src={item.product.imgUrl} alt="product image" className="mouseHover" onClick={() => navigate(`/product/details/${item.product.id}`)} />
                <p>{item.product.name}</p>
              </Col>
              <Col>
                <p>{item.quantity}</p>
              </Col>
              <Col>
                <p>{handleDiscount(item.product).toFixed(2)} €</p>
              </Col>
              <Col>
                <p>{(handleDiscount(item.product) * item.quantity).toFixed(2)} €</p>
              </Col>
            </Row>
            <hr />
          </div>
        );
      })}
      <Row className="mt-5">
        <Col>
          <h3>Totale ordine:</h3>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <h3>{order?.payment.total.toFixed(2)} €</h3>
        </Col>
      </Row>
      <Row>
        <Col className="mt-5">
          <h5>Dati spedizione:</h5>
          <p>
            {order.user.name} {order.user.surname}
          </p>
          <p>
            {order.shipment.zipCode} {order.shipment.city}
          </p>
          <p>
            {order.shipment.address}, {order.shipment.number}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetails;
