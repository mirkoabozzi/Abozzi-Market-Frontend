import { Badge, Button, Col, Container, Image, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ActionType } from "../../redux/enums/ActionType";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cartReducer.content);

  const total = cart.reduce((acc: number, item: IItem) => acc + item.product.price * item.quantity, 0);

  return (
    <Container>
      <h3>Carrello</h3>
      <hr />
      {cart.length > 0 ? (
        cart.map((item: IItem) => {
          return (
            <>
              <Row>
                <Col xs={4}>
                  <Image src={item.product.imgUrl} className="w-100" />
                </Col>
                <Col>
                  <h3>{item.product.name}</h3>
                  <p className="fs-2">{item.product.price} €</p>
                  <Badge>{item.quantity}</Badge>
                  <div className="mt-2">
                    <Button onClick={() => dispatch({ type: ActionType.REMOVE_FROM_CART, payload: item.product })}>Rimuovi articolo</Button>
                  </div>
                </Col>
              </Row>
              <hr />
            </>
          );
        })
      ) : (
        <p>Il carrello è vuolto!</p>
      )}
      <p>Totale: {total}</p>
    </Container>
  );
};

export default Cart;
