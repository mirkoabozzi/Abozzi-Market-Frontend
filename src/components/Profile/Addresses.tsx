import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deleteAddress, getAllAddress } from "../../redux/actions/addressees";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { ExclamationCircleFill, Trash } from "react-bootstrap-icons";
import AddAddress from "./AddAddress";
import ModalAlert from "../ModalAlert/ModalAlert";

const Addresses = () => {
  const dispatch = useAppDispatch();
  const addressees: IAddress[] = useAppSelector((state) => state.addresses.content);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModalAlert, setShowModalAlert] = useState(false);
  const handleCloseModalAlert = () => setShowModalAlert(false);
  const handleShowModalAlert = () => {
    setShow(false);
    setShowModalAlert(true);
  };

  useEffect(() => {
    dispatch(getAllAddress());
  }, [dispatch]);

  const handleDeleteAddress = () => {
    if (selectedAddress) {
      dispatch(deleteAddress(selectedAddress));
      setShowModalAlert(false);
      setSelectedAddress("");
    }
  };

  return (
    <div className="mainAnimation">
      <h1 className="mb-4">Indirizzi</h1>
      <div className="d-flex flex-column flex-sm-row justify-content-sm-center">
        <Button type="button" className="mb-4 rounded-pill" onClick={handleShow}>
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
                <Trash
                  className="mouseHover"
                  onClick={() => {
                    handleShowModalAlert();
                    setSelectedAddress(address.id);
                  }}
                />
              </Col>
              <hr />
            </Row>
          );
        })
      ) : (
        <div className="text-center">
          <Alert>
            <ExclamationCircleFill className="me-2" />
            Nessun indirizzo salvato!
          </Alert>
        </div>
      )}

      {/* modal */}
      <AddAddress show={show} handleClose={handleClose} />
      <ModalAlert show={showModalAlert} handleClose={handleCloseModalAlert} handleEvent={handleDeleteAddress} />
    </div>
  );
};

export default Addresses;
