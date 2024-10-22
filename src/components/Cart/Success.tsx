import { Button, Container, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { execute } from "../../redux/actions/cart";
import { useEffect, useState } from "react";
import { addOrder } from "../../redux/actions/orders";
import { setPaymentLoading } from "../../redux/slice/paymentSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Success = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [paymentId, setPaymentId] = useState("");
  const [payerId, setPayerId] = useState("");
  const user: IUser = useAppSelector((state) => state.userReducer.user);

  const cart: IItem[] = useAppSelector((state) => state.cartReducer.content);
  const address: IAddress = useAppSelector((state) => state.addresses.addressChoice);

  const paymentLoading: boolean = useAppSelector((state) => state.payment.paymentLoading);

  const handleCreateOrder = async () => {
    dispatch(setPaymentLoading(true));
    const orderDetails = cart.map((item: IItem) => ({
      product: item.product.id,
      quantity: item.quantity,
    }));

    const newOrder: IOrderAdd = {
      user: user.id,
      payment: paymentId,
      shipment: address.id,
      orderDetails: orderDetails,
    };
    await dispatch(execute(paymentId, payerId, navigate));
    await dispatch(addOrder(newOrder, navigate));
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
    <Container className="mainAnimation mt-5 rounded-4 text-center">
      <h1 className="mb-5">Conferma il tuo acquisto!</h1>
      {paymentLoading ? (
        <Spinner />
      ) : (
        <Button className="rounded-pill" onClick={handleCreateOrder}>
          Paga
        </Button>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Success;
