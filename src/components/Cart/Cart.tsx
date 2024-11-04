import { Alert, Button, Col, Container, Dropdown, DropdownItem, DropdownMenu, Form, Image, Row, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ActionType } from "../../redux/enums/ActionType";
import { pay } from "../../redux/actions/cart";
import { errorToast, warnToast } from "../../redux/actions/toaster";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getAllAddress } from "../../redux/actions/addressees";
import { setAddressChoice } from "../../redux/slice/addressesSlice";
import { handleDiscountPrice } from "../../redux/actions/products";
import { useNavigate } from "react-router-dom";
import { DashCircle, ExclamationCircleFill, PlusCircle } from "react-bootstrap-icons";
import { setPaymentLoading } from "../../redux/slice/paymentSlice";
import payPal from "../../assets/img/paypal.svg";
import AddAddress from "../Profile/AddAddress";

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart: IItem[] = useAppSelector((state) => state.cartReducer.content);
  const paymentLoading: boolean = useAppSelector((state) => state.payment.paymentLoading);
  const isLogged: boolean = useAppSelector((state) => state.userReducer.isLogged);
  const addresses: IAddress[] = useAppSelector((state) => state.addresses.content);

  const [address, setAddress] = useState<IAddress | null>(null);
  const [pickUp, setPickUp] = useState(false);

  const [showModalAddAddress, setShowModalAddAddress] = useState(false);
  const handleCloseModalAddAddress = () => setShowModalAddAddress(false);
  const handleShowModalAddAddress = () => setShowModalAddAddress(true);

  const handleAddress = (selectedAddress: IAddress) => {
    setAddress(selectedAddress);
  };

  const handleCartAndPayment = () => {
    if (isLogged) {
      if (pickUp || address) {
        if (address) {
          dispatch(setAddressChoice(address));
        }
        dispatch(setPaymentLoading(true));
        dispatch(pay(Number(total.toFixed(2))));
      } else {
        warnToast("Scegli tra spedizione o ritiro in negozio per procedere al pagamento.");
      }
    } else {
      warnToast("Accedi o registrati per procedere con l'acquisto.");
    }
  };

  const handleIncreaseQuantity = (item: IItem) => {
    if (item.product.quantityAvailable <= item.quantity) {
      errorToast("Quantità non disponibile.");
    } else {
      dispatch({ type: ActionType.UPDATE_QUANTITY, payload: { product: item.product, quantity: item.quantity + 1 } });
    }
  };

  const handleDecreaseQuantity = (item: IItem) => {
    if (item.quantity > 1) {
      dispatch({ type: ActionType.UPDATE_QUANTITY, payload: { product: item.product, quantity: item.quantity - 1 } });
    } else if (item.quantity === 1) {
      handelRemoveFromCart(item);
    }
  };

  const handelRemoveFromCart = (item: IItem) => {
    dispatch({ type: ActionType.REMOVE_FROM_CART, payload: item.product });
  };

  const total = cart.reduce((acc: number, item: IItem) => {
    const discountedPrice = handleDiscountPrice(item.product);
    return acc + discountedPrice * item.quantity;
  }, 0);

  useEffect(() => {
    dispatch(getAllAddress());
  }, [dispatch]);

  return (
    <Container className="mt-4 mainAnimation">
      <h3>Carrello</h3>
      <hr />
      {cart.length > 0 ? (
        cart.map((item: IItem, i: number) => {
          return (
            <div key={i}>
              <Row>
                <Col xs={4} lg={2}>
                  <Image src={item.product.imgUrl} className="w-100 mouseHover" onClick={() => navigate(`/product/details/${item.product.id}`)} />
                </Col>
                <Col>
                  <h3>{item.product.name}</h3>
                  <p className="fs-2">€ {handleDiscountPrice(item.product).toFixed(2)}</p>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <DashCircle className="fs-4 mouseHover scale" onClick={() => handleDecreaseQuantity(item)} />
                    <p className="mb-0">{item.quantity}</p>
                    <PlusCircle className="fs-4 mouseHover scale" onClick={() => handleIncreaseQuantity(item)} />
                  </div>
                  <div className="mt-2">
                    <Button className="rounded-pill" onClick={() => handelRemoveFromCart(item)}>
                      Rimuovi articolo
                    </Button>
                  </div>
                </Col>
              </Row>
              <hr />
            </div>
          );
        })
      ) : (
        <div className="text-center">
          <Alert>
            <ExclamationCircleFill className="me-2" />
            Carrello vuoto!
          </Alert>
        </div>
      )}
      {isLogged && cart.length > 0 ? (
        <>
          <h3 className="mb-4">Totale: € {total.toFixed(2)}</h3>
          <Form
            className="d-flex justify-content-center d-sm-block mb-3"
            onChange={() => {
              setPickUp(!pickUp);
              setAddress(null);
            }}
          >
            <div className="d-flex align-items-center">
              <h5 className="mb-0 me-3">Ritiro in negozio</h5>
              <Form.Check className="fs-3" type="switch" id="custom-switch" />
            </div>
          </Form>
          {!pickUp && (
            <Dropdown drop={"down-centered"} className="mt-4 d-flex flex-column flex-sm-row">
              <Dropdown.Toggle className="mb-3 rounded-pill" id="dropdown-button">
                {address ? address.address + " " + address.number : "Seleziona un indirizzo"}
              </Dropdown.Toggle>
              <DropdownMenu>
                <DropdownItem className="custom-dropdown-item" onClick={handleShowModalAddAddress}>
                  Aggiungi indirizzo
                </DropdownItem>
                {addresses?.map((address: IAddress) => {
                  return (
                    <Dropdown.Item className="custom-dropdown-item" onClick={() => handleAddress(address)} key={address.id}>
                      {address.address} {address.number}
                    </Dropdown.Item>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          )}
        </>
      ) : null}
      {cart.length > 0 ? (
        <>
          <div className="d-flex flex-column flex-sm-row justify-content-sm-center">
            <Button className="px-5 border rounded-pill mouseHover" style={{ background: "#FFD243" }} onClick={handleCartAndPayment}>
              <Image width={70} src={payPal} alt="paypal button" />
            </Button>
          </div>
          <div className="d-flex justify-content-center mt-3">{paymentLoading && <Spinner />}</div>
        </>
      ) : null}
      <ToastContainer />
      {/* modal add address */}
      <AddAddress show={showModalAddAddress} handleClose={handleCloseModalAddAddress} />
    </Container>
  );
};

export default Cart;
