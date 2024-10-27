import { Button, Container, Form } from "react-bootstrap";
import { useAppDispatch } from "../../redux/store";
import { getProductByPriceRange, getProducts } from "../../redux/actions/products";
import { useState } from "react";

interface SidebarProps {
  setPage: (page: number) => void;
  setCurrentView: (view: "all" | "discount" | "category" | "priceRange") => void;
  setMinRange: (min: number) => void;
  setMaxRange: (max: number) => void;
}

const Sidebar = ({ setPage, setCurrentView, setMinRange, setMaxRange }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(0);
    setCurrentView("priceRange");
    setMinRange(min);
    setMaxRange(max);
    dispatch(getProductByPriceRange(min, max, 0));
  };

  const handlePromo = () => {
    setPage(0);
    setCurrentView("discount");
  };

  return (
    <Container>
      <h3>Prezzo</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formMinNumber">
          <Form.Label>Min</Form.Label>
          <Form.Control type="number" placeholder="min" value={min} min={0} onChange={(e) => setMin(Number(e.target.value))} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMaxNumber">
          <Form.Label>Max</Form.Label>
          <Form.Control type="number" placeholder="max" value={max} onChange={(e) => setMax(Number(e.target.value))} />
        </Form.Group>
        <Button type="submit" className="rounded-pill w-100">
          Applica
        </Button>
      </Form>
      <hr />
      <Button className="rounded-pill w-100" onClick={handlePromo}>
        Offerte
      </Button>
      <hr />
      <Button className="rounded-pill w-100" onClick={() => dispatch(getProducts(0))}>
        Reset
      </Button>
    </Container>
  );
};

export default Sidebar;
