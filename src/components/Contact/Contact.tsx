import { Button, Container, Form } from "react-bootstrap";

const Contact = () => {
  return (
    <Container className="w-75">
      <Form>
        <Form.Group className="mb-3" controlId="Nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Nome" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Indirizzo email</Form.Label>
          <Form.Control type="email" placeholder="Indirizzo email" />
          <Form.Text className="text-muted">Non condivideremo la tua email con nessuno!</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="textarea">
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Note" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </Container>
  );
};

export default Contact;
