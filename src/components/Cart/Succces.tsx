import { Button, Container } from "react-bootstrap";
import { useAppDispatch } from "../../redux/store";
import { execute } from "../../redux/actions/cart";
import { useEffect, useState } from "react";

const Succces = () => {
  const dispatch = useAppDispatch();
  const [paymentId, setPaymentId] = useState("");
  const [payerId, setPayerId] = useState("");

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
      <Button variant="outline-primary" onClick={() => dispatch(execute(paymentId, payerId))}>
        Paga
      </Button>
    </Container>
  );
};

export default Succces;
