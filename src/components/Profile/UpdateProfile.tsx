import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { getUser, updateUser, updateUserAvatar } from "../../redux/actions/user";
import { useEffect, useState } from "react";

const UpdateProfile = () => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [userData, setUserData] = useState<IUserUpdate>();
  const [avatar, setNewAvatar] = useState<File | null>(null);

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData) {
      dispatch(updateUser(userData));
    }
    if (avatar) {
      dispatch(updateUserAvatar(avatar));
    }
    dispatch(getUser());
  };

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user]);

  return (
    <Row className="justify-content-center">
      <Col>
        <h3 className="mb-4">Aggiorna Profilo</h3>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-around">
            {user?.avatar && <img src={user?.avatar} alt="avatar" className="rounded-circle" style={{ width: "100px", height: "100px", objectFit: "cover" }} />}
          </div>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="name" value={userData?.name} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Label>Cognome</Form.Label>
            <Form.Control type="text" name="surname" value={userData?.surname} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={userData?.email} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNumero">
            <Form.Label>Numero</Form.Label>
            <Form.Control type="text" name="phoneNumber" value={userData?.phoneNumber} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" type="submit">
              Salva Modifiche
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default UpdateProfile;
