import { useEffect } from "react";
import { Col, Dropdown, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getMyOrder, getOrder, orderStatusConverter, updateOrderState } from "../../redux/actions/orders";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { dateConverter, handleDiscountPrice } from "../../redux/actions/products";
import { ToastContainer } from "react-toastify";

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const order: IOrder = useAppSelector((state) => state.ordersReducer.order);
  const user: IUser = useAppSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (params.id) {
      if (user?.role === "ADMIN") {
        dispatch(getOrder(params.id));
      } else {
        dispatch(getMyOrder(params.id, navigate));
      }
    }
  }, [params.id, dispatch, user?.role, navigate]);

  const handleUpdateOrderState = (order: string, state: string) => {
    const body: IOrderUpdateStatus = { order, state };
    dispatch(updateOrderState(body));
  };

  return (
    <div className="mainAnimation">
      <h3 className="mb-4">Ordine: {order?.id}</h3>
      <Row className="mb-5">
        <Col sm={4}>
          <p>Data ordine: {dateConverter(order?.orderDate)}</p>
        </Col>
        <Col sm={4}>
          <p>
            Stato ordine: <strong>{orderStatusConverter(order?.ordersState)}</strong>
          </p>
          {user?.role === "ADMIN" ? (
            <Dropdown drop={"down-centered"} className="d-flex flex-column flex-sm-row">
              <Dropdown.Toggle variant="primary" id="dropdown-basic" className="py-1 rounded-5">
                Stato
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="custom-dropdown-item" onClick={() => handleUpdateOrderState(order.id, "PROCESSING")}>
                  In lavorazione
                </Dropdown.Item>
                <Dropdown.Item className="custom-dropdown-item" onClick={() => handleUpdateOrderState(order.id, "CANCELLED")}>
                  Cancellato
                </Dropdown.Item>
                <Dropdown.Item className="custom-dropdown-item" onClick={() => handleUpdateOrderState(order.id, "SHIPPED")}>
                  Spedito
                </Dropdown.Item>
                <Dropdown.Item className="custom-dropdown-item" onClick={() => handleUpdateOrderState(order.id, "IN_TRANSIT")}>
                  In transito
                </Dropdown.Item>
                <Dropdown.Item className="custom-dropdown-item" onClick={() => handleUpdateOrderState(order.id, "ON_DELIVERY")}>
                  In consegna
                </Dropdown.Item>
                <Dropdown.Item className="custom-dropdown-item" onClick={() => handleUpdateOrderState(order.id, "DELIVERED")}>
                  Consegnato
                </Dropdown.Item>
                <Dropdown.Item className="custom-dropdown-item" onClick={() => handleUpdateOrderState(order.id, "READY_TO_PICKUP")}>
                  Pronto per il ritiro
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : null}
        </Col>
        <Col sm={4}>
          <p className="mt-3 mt-sm-0">
            Pagamento: <strong>{order?.payment.status === "approved" ? "Approvato" : order?.payment.status}</strong>
          </p>
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
              <Col xs={3}>
                <p className="fs-4 text-truncate">{item.product.name}</p>
                <Image src={item.product.imgUrl} alt="product image" className="mouseHover w-100 rounded-3" onClick={() => navigate(`/product/details/${item.product.id}`)} />
              </Col>
              <Col xs={3}>
                <p>{item.quantity}</p>
              </Col>
              <Col xs={3}>
                <p>€{handleDiscountPrice(item.product).toFixed(2)}</p>
              </Col>
              <Col xs={3}>
                <p>€{(handleDiscountPrice(item.product) * item.quantity).toFixed(2)}</p>
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
          <h3>€{order?.payment.total.toFixed(2)}</h3>
        </Col>
      </Row>
      <h5 className="mt-5">Dati spedizione:</h5>
      {order?.user && order?.shipment ? (
        <Row>
          <Col className="mt-5">
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
      ) : (
        <p>Ritiro in negozio</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default OrderDetails;
