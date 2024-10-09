import { Container, Form } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Container>
      <h3>Prezzo</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Min</Form.Label>
          <Form.Control type="text" placeholder="min" />
        </Form.Group>
      </Form>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Max</Form.Label>
          <Form.Control type="text" placeholder="max" />
        </Form.Group>
      </Form>
      <hr />
    </Container>
  );
};
export default Sidebar;
