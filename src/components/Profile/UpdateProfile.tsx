import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getUser, updateUser, updateUserAvatar } from "../../redux/actions/user";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const UpdateProfile = () => {
  const user: IUser = useAppSelector((state: RootState) => state.userReducer.user);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setNewAvatar] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const infoToast = () => {
    toast.info("Dati aggiornati con successo!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: IUserUpdate = { name, surname, email, phoneNumber };

    await dispatch(updateUser(userData));

    if (avatar) {
      await dispatch(updateUserAvatar(avatar));
    }
    dispatch(getUser());
    infoToast();
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
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
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Label>Cognome</Form.Label>
            <Form.Control type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNumero">
            <Form.Label>Numero</Form.Label>
            <Form.Control type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
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
      <ToastContainer />
    </Row>
  );
};

export default UpdateProfile;
