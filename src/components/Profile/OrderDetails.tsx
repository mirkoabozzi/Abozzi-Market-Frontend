import { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../../redux/actions/orders";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const order: IOrder = useAppSelector((state: RootState) => state.ordersReducer.order);

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
          <div key={order.id}>
            <Row>
              <Col>
                <Image height={100} src={item.product.imgUrl} alt="product image" className="mouseHover" onClick={() => navigate(`/product/details/${item.product.id}`)} />
                <p>{item.product.name}</p>
              </Col>
              <Col>
                <p>{item.quantity}</p>
              </Col>
              <Col>
                <p>{item.product.price} €</p>
              </Col>
              <Col>
                <p>{item.product.price * item.quantity} €</p>
              </Col>
            </Row>
            <hr />
          </div>
        );
      })}
      <Row className="mt-5">
        <Col>
          <p>Totale ordine:</p>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <p>{order?.payment.total} €</p>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetails;
