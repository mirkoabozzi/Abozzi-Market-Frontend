import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../../redux/store";
import { addDiscount } from "../../redux/actions/discount";

const Discount = () => {
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState("");
  const [percentage, setPercentage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newDiscount: IDiscountAdd = {
      description,
      percentage,
      startDate,
      endDate,
    };
    dispatch(addDiscount(newDiscount));
    setDescription("");
    setPercentage("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <h3>Promo</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control type="text" placeholder="Descrizione" required value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Percentuale</Form.Label>
          <Form.Control type="number" placeholder="Percentuale" required value={percentage} onChange={(e) => setPercentage(e.target.value)} min={1} max={100} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Inizio</Form.Label>
          <Form.Control type="date" placeholder="Data inizio" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Fine</Form.Label>
          <Form.Control type="date" placeholder="Data fine" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </Form.Group>
        <div className="text-center mt-5">
          <Button type="submit" variant="primary">
            Aggiungi promozione
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </>
  );
};

export default Discount;
