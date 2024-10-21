import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addAddress, deleteAddress, getAllAddress } from "../../redux/actions/addressees";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { ToastContainer } from "react-toastify";

const Addresses = () => {
  const dispatch = useAppDispatch();
  const addressees = useAppSelector((state) => state.addresses.content);

  const [address, setAddress] = useState("");
  const [number, setNumber] = useState(1);
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getAllAddress());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAddress = {
      address,
      number,
      city,
      zipCode,
    };
    dispatch(addAddress(newAddress));
    setAddress("");
    setCity("");
    setNumber(1);
    setZipCode("");
  };

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
      {addressees?.map((address: IAddress) => {
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
      })}

      {/* modal add category*/}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi nuovo indirizzo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CAP</Form.Label>
              <Form.Control type="text" placeholder="CAP" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Indirizzo</Form.Label>
              <Form.Control type="text" placeholder="Indirizzo" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Numero</Form.Label>
              <Form.Control type="number" placeholder="numero" min={1} value={number} onChange={(e) => setNumber(Number(e.target.value))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Città</Form.Label>
              <Form.Control type="text" placeholder="Città" value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Group>
            <div className="d-flex gap-1 justify-content-center">
              <Button variant="secondary" className="rounded-pill" onClick={handleClose}>
                Chiudi
              </Button>
              <Button type="submit" variant="primary" className="rounded-pill" onClick={handleClose}>
                Salva
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Addresses;
