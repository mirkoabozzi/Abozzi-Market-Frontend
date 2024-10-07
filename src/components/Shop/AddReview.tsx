import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addReview } from "../../redux/actions/reviews";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";

interface AddReviewProps {
  show: boolean;
  handleClose: () => void;
}

const AddReview = ({ show, handleClose }: AddReviewProps) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const product = params.id;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product) {
      const reviewData = { rating, comment, product };
      dispatch(addReview(reviewData));
      handleClose();
    }
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi recensione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Valutazione</Form.Label>
            <Form.Control type="number" min={1} max={5} placeholder="Inserisci un voto da 1 a 5" required autoFocus value={rating} onChange={(e) => setRating(Number(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Commento</Form.Label>
            <Form.Control as={"textarea"} rows={3} placeholder="Ottimo!" required value={comment} onChange={(e) => setComment(e.target.value)} />
          </Form.Group>
          <div className="text-center">
            <Button className="m-2" variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="submit" variant="primary">
              Invia
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default AddReview;
