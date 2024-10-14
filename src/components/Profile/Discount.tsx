import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addDiscount, deletePromo, getAllDiscounts } from "../../redux/actions/discount";
import { Trash } from "react-bootstrap-icons";
import { dataConverter } from "../../redux/actions/products";
import ModalAlert from "../ModalAlert";

const Discount = () => {
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState("");
  const [percentage, setPercentage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [promoSelected, setPromoSelected] = useState("");

  const discounts = useAppSelector((state) => state.discounts.content);

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

  useEffect(() => {
    dispatch(getAllDiscounts());
  }, [dispatch]);

  return (
    <>
      <h4>Aggiungi promozioni</h4>
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
          <Form.Control type="datetime-local" placeholder="Data inizio" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Fine</Form.Label>
          <Form.Control type="datetime-local" placeholder="Data fine" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </Form.Group>
        <div className="text-center mt-5">
          <Button type="submit" variant="primary">
            Aggiungi promozione
          </Button>
        </div>
      </Form>
      {discounts.length > 0 ? (
        <>
          <h3 className="mt-5">Promozioni attive</h3>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Descrizione</th>
                <th>Sconto</th>
                <th>Inizio</th>
                <th>Fine</th>
                <th>Elimina</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount: DiscountListItem, index: number) => {
                return (
                  <tr key={discount.id}>
                    <td>{index + 1}</td>
                    <td>{discount.description}</td>
                    <td>{discount.percentage}</td>
                    <td>{dataConverter(discount.startDate)}</td>
                    <td>{dataConverter(discount.endDate)}</td>
                    <td>
                      <Trash
                        className="mouseHover"
                        onClick={() => {
                          setShow(true);
                          setPromoSelected(discount.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <h3 className="mt-4 text-center">Nessuna promozione disponibile</h3>
      )}
      <ModalAlert
        show={show}
        handleClose={handleClose}
        handleEvent={() => {
          dispatch(deletePromo(promoSelected));
          handleClose();
        }}
      />
      <ToastContainer />
    </>
  );
};

export default Discount;
