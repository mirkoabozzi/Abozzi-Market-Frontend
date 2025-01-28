import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getUser, updateUser, updateUserAvatarAxios } from "../../redux/actions/user";
import { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import { errorToast } from "../../redux/actions/toaster";

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const user: IUser = useAppSelector((state) => state.userReducer.user);
  const [userData, setUserData] = useState({ name: "", surname: "", email: "", phoneNumber: "" });
  const [avatar, setNewAvatar] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, userData: IUserUpdate) => {
    e.preventDefault();

    const onlyPhoneNumbers = /^\+?\d+$/;

    if (userData.phoneNumber.match(onlyPhoneNumbers)) {
      await dispatch(updateUser(userData));
    } else {
      errorToast("Inserisci un numero valido");
    }

    if (avatar) {
      setUploadProgress(0);
      await dispatch(updateUserAvatarAxios(avatar, setUploadProgress));
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
    <Row className="justify-content-center mainAnimation">
      <Col>
        <h3 className="mb-4">Aggiorna Profilo</h3>
        <Form onSubmit={(e) => handleSubmit(e, userData)}>
          <div className="d-flex justify-content-around">
            {user?.avatar && <img src={user?.avatar} alt="avatar" className="rounded-circle" style={{ width: "100px", height: "100px", objectFit: "cover" }} referrerPolicy="no-referrer" />}
          </div>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="name" value={userData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Label>Cognome</Form.Label>
            <Form.Control type="text" name="surname" value={userData.surname} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNumero">
            <Form.Label>Numero</Form.Label>
            <Form.Control type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          {uploadProgress > 0 && <div className="my-4 rounded" style={{ border: "5px solid", width: `${uploadProgress}%` }}></div>}
          {uploadProgress > 0 && <span>Caricamento immagine... {uploadProgress}%</span>}
          <div className="d-flex flex-column flex-sm-row justify-content-sm-end gap-3 mt-4">
            {user?.registrationMethod === "FORM" && (
              <Button type="button" variant="primary" className="rounded-pill" onClick={() => setShow(true)}>
                Cambia password
              </Button>
            )}
            <Button variant="primary" type="submit" className="rounded-pill">
              Salva Modifiche
            </Button>
          </div>
        </Form>
      </Col>
      <ChangePassword show={show} handleClose={handleClose} />
    </Row>
  );
};

export default UpdateProfile;
