import { Button, Container, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { executePayPal, stripeVerify } from "../../redux/actions/cart";
import { useEffect, useState } from "react";
import { addOrder } from "../../redux/actions/orders";
import { setPaymentLoading } from "../../redux/slice/paymentSlice";
import { useNavigate } from "react-router-dom";
import MetaTags from "../MetaTags";
import { handleDiscountPrice } from "../../redux/actions/products.ts";

const Success = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [paymentId, setPaymentId] = useState("");
  const [payerId, setPayerId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const user: IUser = useAppSelector((state) => state.userReducer.user);

  const cart: IItem[] = useAppSelector((state) => state.cartReducer.content);
  const address: IAddress = useAppSelector((state) => state.addresses.addressChoice);

  const paymentLoading: boolean = useAppSelector((state) => state.payment.paymentLoading);

  const handleCreateOrder = async () => {
    dispatch(setPaymentLoading(true));
    const orderDetails = cart.map((item: IItem) => ({
      product: item.product.id,
      quantity: item.quantity,
      price: handleDiscountPrice(item.product)
    }));

    const newOrder: IOrderAdd = {
      user: user.id,
      payment: paymentId || sessionId,
      shipment: address ? address.id : null,
      orderDetails: orderDetails,
    };

    if (payerId && paymentId) {
      await dispatch(executePayPal(paymentId, payerId, navigate));
      await dispatch(addOrder(newOrder, navigate));
    } else if (sessionId) {
      await dispatch(stripeVerify(sessionId, navigate));
      await dispatch(addOrder(newOrder, navigate));
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");
    const sessionId = searchParams.get("session_id");
    if (paymentId && payerId) {
      setPaymentId(paymentId);
      setPayerId(payerId);
    }
    if (sessionId) {
      setSessionId(sessionId);
    }
  }, []);

  return (
    <Container className="mainAnimation mt-5 rounded-4 text-center">
      <MetaTags title="Abozzi Market" description="Da Abozzi Market troverai una vasta gamma di prodotti alimentari e non da poter acquistare." />
      <h1 className="mb-5">Conferma il tuo acquisto.</h1>
      {paymentLoading ? (
        <Spinner />
      ) : (
        <div className="d-flex flex-column flex-sm-row justify-content-sm-center">
          <Button type="button" className="rounded-pill" onClick={handleCreateOrder}>
            Paga
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Success;
