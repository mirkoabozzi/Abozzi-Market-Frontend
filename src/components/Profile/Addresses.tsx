import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addAddress, getAllAddress } from "../../redux/actions/addressees";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { successToast } from "../../redux/actions/toaster";

const Addresses = () => {
  const dispatch = useAppDispatch();
  const addressees = useAppSelector((state) => state.addresses.content);

  const [address, setAddress] = useState("");
  const [number, setNumber] = useState(0);
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
    successToast("Indirizzo aggiunto");
  };

  return (
    <>
      <h3>Indirizzi</h3>
      <Button className="my-4" onClick={handleShow}>
        Aggiungi indirizzo
      </Button>
      {addressees.map((address: IAddress) => {
        return (
          <Row>
            <Col>
              <p>
                {address.zipCode} {address.city}
              </p>
              <p>
                {address.address}, {address.number}
              </p>
            </Col>
            <Col>
              <Trash />
            </Col>
            <hr />
          </Row>
        );
      })}

      {/* modal add category*/}
      <Modal show={show} onHide={handleClose}>
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
              <Form.Control type="number" placeholder="numero" value={number} onChange={(e) => setNumber(Number(e.target.value))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Città</Form.Label>
              <Form.Control type="text" placeholder="Città" value={city} onChange={(e) => setCity(e.target.value)} />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Chiudi
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Salva
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Addresses;
