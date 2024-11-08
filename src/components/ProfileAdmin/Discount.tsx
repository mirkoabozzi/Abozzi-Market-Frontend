import { useEffect, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addDiscount, deletePromo, getAllDiscounts } from "../../redux/actions/discount";
import { ExclamationCircleFill, Pencil, Trash } from "react-bootstrap-icons";
import { dateConverter } from "../../redux/actions/products";
import ModalAlert from "../ModalAlert/ModalAlert";
import DiscountUpdateModal from "./DiscountUpdateModal";

const Discount = () => {
  const dispatch = useAppDispatch();

  const discounts: DiscountListItem[] = useAppSelector((state) => state.discounts.content);
  const [description, setDescription] = useState("");
  const [percentage, setPercentage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discount, setDiscount] = useState<DiscountListItem>();
  const [promoSelected, setPromoSelected] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showUpdateDiscount, setShowUpdateDiscount] = useState(false);
  const handleCloseUpdateDiscountModal = () => setShowUpdateDiscount(false);

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
    <div className="mainAnimation">
      <h3 className="mb-4">Promozioni</h3>
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
        <div className="d-flex flex-column flex-sm-row justify-content-sm-center mt-5">
          <Button type="submit" variant="primary" className="rounded-pill">
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
                <th>Modifica</th>
              </tr>
            </thead>
            <tbody>
              {discounts?.map((discount: DiscountListItem, index: number) => {
                return (
                  <tr key={discount.id}>
                    <td>{index + 1}</td>
                    <td>{discount.description}</td>
                    <td>{discount.percentage}</td>
                    <td>{dateConverter(discount.startDate)}</td>
                    <td>{dateConverter(discount.endDate)}</td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <Trash
                          className="mouseHover scale"
                          onClick={() => {
                            setShow(true);
                            setPromoSelected(discount.id);
                          }}
                        />
                        <Pencil
                          className="mouseHover scale"
                          onClick={() => {
                            setDiscount(discount);
                            setShowUpdateDiscount(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <div className="text-center mt-4">
          <Alert>
            <ExclamationCircleFill className="me-2" />
            Nessuna promozione disponibile
          </Alert>
        </div>
      )}
      <ModalAlert
        show={show}
        handleClose={handleClose}
        handleEvent={() => {
          dispatch(deletePromo(promoSelected));
          handleClose();
        }}
      />
      {discount && <DiscountUpdateModal show={showUpdateDiscount} handleClose={handleCloseUpdateDiscountModal} discount={discount} />}
    </div>
  );
};

export default Discount;
