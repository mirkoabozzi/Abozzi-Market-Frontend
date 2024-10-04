import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const UpdateProfile = () => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  return (
    <Row className="justify-content-center">
      <Col>
        <Card className="p-4">
          <h3 className="text-center mb-4">Aggiorna Profilo</h3>
          <Form>
            <div className="d-flex justify-content-around">
              {user?.avatar && <img src={user?.avatar} alt="avatar" className="rounded-circle" style={{ width: "100px", height: "100px", objectFit: "cover" }} />}
            </div>

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="name" value={user?.name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSurname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" name="surname" value={user?.surname} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={user?.email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNumero">
              <Form.Label>Numero</Form.Label>
              <Form.Control type="text" name="numero" value={user?.phoneNumber} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAvatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="primary" type="submit">
                Salva Modifiche
              </Button>
              <Button variant="warning" type="submit">
                Annulla
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default UpdateProfile;
