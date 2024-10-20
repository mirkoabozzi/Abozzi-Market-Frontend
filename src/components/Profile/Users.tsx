import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deleteUser, findUserByName, getAllUser, updateUserRole } from "../../redux/actions/user";
import { Badge, Col, Dropdown, Form, Image, Row, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { dateConverter } from "../../redux/actions/products";
import { ArrowLeftCircle, ArrowRightCircle, Trash } from "react-bootstrap-icons";
import ModalAlert from "../ModalAlert/ModalAlert";

const Users = () => {
  const users: IUser[] = useAppSelector((state) => state.userReducer.users);
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [userSelected, setUserSelected] = useState("");

  const [name, setName] = useState("");

  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getAllUser(page));
  }, [dispatch, page]);

  const handleUserRole = (user: string, role: string) => {
    const body: IUserRole = { user, role };
    dispatch(updateUserRole(body));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(findUserByName(name));
  };

  return (
    <>
      <h3>Clienti</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control type="text" placeholder="Cliente" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
      </Form>
      {users.length > 0 ? (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Nome</th>
              <th>Cognome</th>
              <th>Email</th>
              <th>Ruolo</th>
              <th>Telefono</th>
              <th>Data registrazione</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: IUser, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Image src={user.avatar} width={60} height={60} alt="logo" />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role}
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic" className="py-0 rounded-pill">
                        Ruolo
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleUserRole(user.id, "USER")}>USER</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleUserRole(user.id, "ADMIN")}>ADMIN</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{dateConverter(user.registrationDate)}</td>
                  <td>
                    <Trash
                      className="mouseHover"
                      onClick={() => {
                        setShow(true);
                        setUserSelected(user.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h3> Nessun cliente trovato</h3>
      )}
      <Row className="text-center mt-5">
        <Col>
          {page > 0 ? <ArrowLeftCircle className="mouseHover scale" width={30} height={30} onClick={() => setPage(page - 1)} /> : <ArrowLeftCircle width={30} height={30} style={{ opacity: 0.5 }} />}
        </Col>
        <Col>
          <Badge className="fs-6 rounded-pill">{page}</Badge>
        </Col>
        <Col>
          {users.length > 0 ? (
            <ArrowRightCircle className="mouseHover scale" width={30} height={30} onClick={() => setPage(page + 1)} />
          ) : (
            <ArrowRightCircle width={30} height={30} style={{ opacity: 0.5 }} />
          )}
        </Col>
      </Row>
      <ModalAlert
        show={show}
        handleClose={handleClose}
        handleEvent={() => {
          dispatch(deleteUser(userSelected));
          handleClose();
        }}
      />
      <ToastContainer />
    </>
  );
};

export default Users;
