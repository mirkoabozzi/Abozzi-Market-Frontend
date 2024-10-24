import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../redux/store";
import { updateDiscount } from "../../redux/actions/discount";

interface DiscountUpdateModalProp {
  show: boolean;
  handleClose: () => void;
  discount: DiscountListItem;
}

const DiscountUpdateModal = ({ show, handleClose, discount }: DiscountUpdateModalProp) => {
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState(discount.description);
  const [percentage, setPercentage] = useState(discount.percentage);
  const [startDate, setStartDate] = useState(discount.startDate);
  const [endDate, setEndDate] = useState(discount.endDate);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedDiscount: DiscountListItem = { id: discount.id, description, percentage, startDate, endDate };
    dispatch(updateDiscount(updatedDiscount));
    handleClose();
  };

  useEffect(() => {
    if (discount) {
      setDescription(discount.description);
      setPercentage(discount.percentage);
      setStartDate(discount.startDate);
      setEndDate(discount.endDate);
    }
  }, [discount]);

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Promo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control type="text" placeholder="Descrizione" required value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Percentuale</Form.Label>
            <Form.Control type="number" placeholder="Percentuale" required value={percentage} onChange={(e) => setPercentage(Number(e.target.value))} min={1} max={100} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Inizio</Form.Label>
            <Form.Control type="datetime-local" placeholder="Data inizio" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Fine</Form.Label>
            <Form.Control type="datetime-local" placeholder="Data fine" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </Form.Group>
          <div className="text-center">
            <Button type="submit" variant="primary" className="m-2 rounded-pill">
              Aggiorna
            </Button>
            <Button variant="secondary" className="m-2 rounded-pill" onClick={handleClose}>
              Chiudi
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DiscountUpdateModal;
