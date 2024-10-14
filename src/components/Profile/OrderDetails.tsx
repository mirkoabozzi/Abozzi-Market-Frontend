import { useEffect } from "react";
import { Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder, updateOrderState } from "../../redux/actions/orders";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { dataConverter, handleDiscountPrice } from "../../redux/actions/products";
import { ToastContainer } from "react-toastify";

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const order: IOrder = useAppSelector((state) => state.ordersReducer.order);
  const user: IUser = useAppSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (params.id) {
      dispatch(getOrder(params.id));
    }
  }, [params.id, dispatch]);

  const handleUpdateOrderState = (order: string, state: string) => {
    const body: IOrderUpdateStatus = { order, state };
    dispatch(updateOrderState(body));
  };

  return (
    <Container>
      <h4 className="mb-5">Ordine: {order?.id}</h4>
      <Row className="mb-5">
        <Col xs={4}>
          <p>Data ordine: {dataConverter(order?.orderDate)}</p>
        </Col>
        <Col>
          <p>Stato ordine: {order?.ordersState}</p>
          {user?.role === "ADMIN" ? (
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Stato
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleUpdateOrderState(order.id, "PROCESSING")}>PROCESSING</Dropdown.Item>
                <Dropdown.Item onClick={() => handleUpdateOrderState(order.id, "CANCELLED")}>CANCELLED</Dropdown.Item>
                <Dropdown.Item onClick={() => handleUpdateOrderState(order.id, "SHIPPED")}>SHIPPED</Dropdown.Item>
                <Dropdown.Item onClick={() => handleUpdateOrderState(order.id, "IN_TRANSIT")}>IN_TRANSIT</Dropdown.Item>
                <Dropdown.Item onClick={() => handleUpdateOrderState(order.id, "ON_DELIVERY")}>ON_DELIVERY</Dropdown.Item>
                <Dropdown.Item onClick={() => handleUpdateOrderState(order.id, "DELIVERED")}>DELIVERED</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ""
          )}
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
                <p>{handleDiscountPrice(item.product).toFixed(2)} €</p>
              </Col>
              <Col>
                <p>{(handleDiscountPrice(item.product) * item.quantity).toFixed(2)} €</p>
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
      {order?.user && (
        <Row>
          <Col className="mt-5">
            <h5>Dati spedizione:</h5>
            <p>
              {order?.user.name} {order.user.surname}
            </p>
            <p>
              {order?.shipment.zipCode} {order.shipment.city}
            </p>
            <p>
              {order?.shipment.address}, {order.shipment.number}
            </p>
          </Col>
        </Row>
      )}
      <ToastContainer />
    </Container>
  );
};

export default OrderDetails;
