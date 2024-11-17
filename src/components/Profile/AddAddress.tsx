import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../redux/store";
import { addAddress } from "../../redux/actions/addressees";

interface AddAddressProps {
  show: boolean;
  handleClose: () => void;
}
const AddAddress = ({ show, handleClose }: AddAddressProps) => {
  const dispatch = useAppDispatch();

  const [address, setAddress] = useState("");
  const [number, setNumber] = useState(1);
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

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

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi nuovo indirizzo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formZipCode">
            <Form.Label>CAP</Form.Label>
            <Form.Control type="text" placeholder="CAP" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control type="text" placeholder="Indirizzo" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNumber">
            <Form.Label>Numero</Form.Label>
            <Form.Control type="number" placeholder="numero" min={1} value={number} onChange={(e) => setNumber(Number(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCity">
            <Form.Label>Città</Form.Label>
            <Form.Control type="text" placeholder="Città" value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Button type="button" variant="secondary" className="rounded-pill" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="submit" variant="primary" className="rounded-pill" onClick={handleClose}>
              Salva
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAddress;
