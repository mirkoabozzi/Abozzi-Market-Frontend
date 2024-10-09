import { Container, Form } from "react-bootstrap";
import { useAppDispatch } from "../../redux/store";
import { getProductByPriceRange } from "../../redux/actions/products";
import { useState } from "react";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getProductByPriceRange(min, max));
  };

  return (
    <Container>
      <h3>Prezzo</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Min</Form.Label>
          <Form.Control type="number" placeholder="min" value={min} min={0} onChange={(e) => setMin(Number(e.target.value))} />
        </Form.Group>
      </Form>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Max</Form.Label>
          <Form.Control type="number" placeholder="max" value={max} onChange={(e) => setMax(Number(e.target.value))} />
        </Form.Group>
      </Form>
      <hr />
    </Container>
  );
};
export default Sidebar;
