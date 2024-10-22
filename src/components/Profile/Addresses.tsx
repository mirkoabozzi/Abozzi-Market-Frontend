import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deleteAddress, getAllAddress } from "../../redux/actions/addressees";
import { Button, Col, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { ToastContainer } from "react-toastify";
import AddAddress from "./AddAddress";

const Addresses = () => {
  const dispatch = useAppDispatch();
  const addressees = useAppSelector((state) => state.addresses.content);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getAllAddress());
  }, [dispatch]);

  const handleDeleteAddress = (addressId: string | undefined) => {
    if (addressId) {
      dispatch(deleteAddress(addressId));
    }
  };

  return (
    <div className="mainAnimation">
      <h3>Indirizzi</h3>
      <div className="d-flex justify-content-center">
        <Button className="my-4 rounded-pill" onClick={handleShow}>
          Aggiungi indirizzo
        </Button>
      </div>
      {addressees?.length > 0 ? (
        addressees?.map((address: IAddress) => {
          return (
            <Row key={address.id}>
              <Col>
                <p>
                  {address.zipCode} {address.city}
                </p>
                <p>
                  {address.address}, {address.number}
                </p>
              </Col>
              <Col className="text-end">
                <Trash className="mouseHover" onClick={() => handleDeleteAddress(address.id)} />
              </Col>
              <hr />
            </Row>
          );
        })
      ) : (
        <h4 className="text-center mt-3">Non hai indirizzi salvati!</h4>
      )}

      {/* modal add address */}
      <AddAddress show={show} handleClose={handleClose} />
      <ToastContainer />
    </div>
  );
};

export default Addresses;
