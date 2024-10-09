import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ActionType } from "../../redux/enums/ActionType";
import { pay } from "../../redux/actions/cart";
import { warnToast } from "../../redux/actions/toaster";
import { ToastContainer } from "react-toastify";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart: IItem[] = useAppSelector((state) => state.cartReducer.content);

  const total = cart.reduce((acc: number, item: IItem) => acc + item.product.price * item.quantity, 0);

  const isLogged: boolean = useAppSelector((state) => state.userReducer.isLogged);

  const handleCartAndPayment = () => {
    if (isLogged) {
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(pay(Number(total.toFixed(2))));
    } else {
      warnToast("Devi fare l'accesso per procedere con l'aquisto!");
    }
  };

  const handleIncreaseQuantity = (item: IItem) => {
    dispatch({ type: ActionType.INCREASE_QUANTITY, payload: { product: item.product, quantity: item.quantity + 1 } });
  };

  const handleDecreseQuantity = (item: IItem) => {
    dispatch({ type: ActionType.DECREASE_QUANTITY, payload: { product: item.product, quantity: item.quantity - 1 } });
  };

  return (
    <Container>
      <h3>Carrello</h3>
      <hr />
      {cart.length > 0 ? (
        cart.map((item: IItem, i: number) => {
          return (
            <div key={i}>
              <Row>
                <Col sm={4} lg={2}>
                  <Image src={item.product.imgUrl} className="w-100" />
                </Col>
                <Col>
                  <h3>{item.product.name}</h3>
                  <p className="fs-2">{item.product.price} €</p>
                  <div className="d-flex align-items-center gap-3">
                    <Button onClick={() => handleDecreseQuantity(item)}>-</Button>
                    <p className="mb-0">{item.quantity}</p>
                    <Button onClick={() => handleIncreaseQuantity(item)}>+</Button>
                  </div>
                  <div className="mt-2">
                    <Button onClick={() => dispatch({ type: ActionType.REMOVE_FROM_CART, payload: item.product })}>Rimuovi articolo</Button>
                  </div>
                </Col>
              </Row>
              <hr />
            </div>
          );
        })
      ) : (
        <h3>Il carrello è vuolto!</h3>
      )}
      <h3 className="mb-4">Totale: {total.toFixed(2)} €</h3>
      {cart.length > 0 ? <Button onClick={handleCartAndPayment}>Acquista</Button> : ""}
      <ToastContainer />
    </Container>
  );
};

export default Cart;
