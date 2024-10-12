import { Button, Container, Form } from "react-bootstrap";
import { url } from "../../redux/actions/user";
import { errorToast, successToast } from "../../redux/actions/toaster";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const sendMail = async () => {
    try {
      const resp = await fetch(`${url}/mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, text }),
      });
      if (resp.ok) {
        successToast("Email inviata correttamente");
      } else {
        throw new Error("Send email error");
      }
    } catch (error) {
      errorToast("Errore nell'invio della email");
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMail();
    setName("");
    setEmail("");
    setText("");
  };

  return (
    <Container className="w-75">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="Nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Nome" required value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Indirizzo email</Form.Label>
          <Form.Control type="email" placeholder="Indirizzo email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Form.Text className="text-muted">Non condivideremo la tua email con nessuno!</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="textarea">
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Note" required value={text} onChange={(e) => setText(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default Contact;