import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../redux/store";
import { updateReview } from "../../redux/actions/reviews";

interface UpdateReviewsProps {
  show: boolean;
  handleClose: () => void;
  review: IReview;
  handleShowModalAlert: () => void;
}

const ReviewUpdate = ({ show, handleClose, review, handleShowModalAlert }: UpdateReviewsProps) => {
  const dispatch = useAppDispatch();

  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedReview: IUpdatedReview = { rating, comment };
    dispatch(updateReview(review.id, updatedReview, review.product.id));
    handleClose();
  };

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica recensione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formRating">
            <Form.Label>Valutazione</Form.Label>
            <Form.Control type="number" min={1} max={5} placeholder="Inserisci un voto da 1 a 5" required autoFocus value={rating} onChange={(e) => setRating(Number(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formComment">
            <Form.Label>Commento</Form.Label>
            <Form.Control as={"textarea"} rows={3} placeholder="Ottimo!" required value={comment} onChange={(e) => setComment(e.target.value)} />
          </Form.Group>
          <div className="d-flex gap-1 justify-content-center">
            <Button variant="secondary" className="rounded-pill" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="button" variant="danger" className="rounded-pill" onClick={handleShowModalAlert}>
              Elimina
            </Button>
            <Button type="submit" variant="primary" className="rounded-pill">
              Invia
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewUpdate;
