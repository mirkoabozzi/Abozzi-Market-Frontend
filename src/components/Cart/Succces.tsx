import { Button, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { execute } from "../../redux/actions/cart";
import { useEffect, useState } from "react";
import { addOrder } from "../../redux/actions/orders";

const Succces = () => {
  const dispatch = useAppDispatch();
  const [paymentId, setPaymentId] = useState("");
  const [payerId, setPayerId] = useState("");
  const user: IUser = useAppSelector((state) => state.userReducer.user);

  const cart: IItem[] = JSON.parse(localStorage.getItem("cart"));

  const handleCreateOrder = async () => {
    const orderDetails = cart.map((item: IItem) => ({
      product: item.product.id,
      quantity: item.quantity,
    }));

    const newOrder: IOrderAdd = {
      user: user.id,
      payment: paymentId,
      shipment: "64b652be-1502-4f0b-8c47-50e99a9b0280",
      orderDetails: orderDetails,
    };
    await dispatch(execute(paymentId, payerId));
    await dispatch(addOrder(newOrder));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");
    if (paymentId && payerId) {
      setPaymentId(paymentId);
      setPayerId(payerId);
    }
  }, []);

  return (
    <Container className="mainContainer mt-5 rounded-4 text-center">
      <h1>Conferma il tuo acquisto!</h1>
      <Button variant="outline-primary" onClick={handleCreateOrder}>
        Paga
      </Button>
    </Container>
  );
};

export default Succces;
