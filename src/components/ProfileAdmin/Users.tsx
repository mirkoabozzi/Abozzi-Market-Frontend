import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deleteUser, findUserByName, getAllUser, updateUserRole } from "../../redux/actions/user";
import { Alert, Badge, Button, Col, Dropdown, Form, Image, Row, Table } from "react-bootstrap";
import { dateConverter } from "../../redux/actions/products";
import { ArrowLeftCircle, ArrowRightCircle, CheckAll, ExclamationCircleFill, Search, Trash } from "react-bootstrap-icons";
import ModalAlert from "../ModalAlert/ModalAlert";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const users: IUsersInterface = useAppSelector((state) => state.userReducer.users);
  const authUser: IUser = useAppSelector((state) => state.userReducer.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [userSelected, setUserSelected] = useState("");

  const [name, setName] = useState("");

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (name) {
      dispatch(findUserByName(name, page));
    } else {
      dispatch(getAllUser(page, navigate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  const handleUserRole = (user: string, role: string) => {
    const body: IUserRole = { user, role };
    dispatch(updateUserRole(body));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(findUserByName(name, page));
  };

  return (
    <div className="mainAnimation">
      <h1>Clienti</h1>
      <Form className="my-4 d-flex position-relative" onSubmit={handleSubmit}>
        <Form.Control type="text" placeholder="Cliente" value={name} onChange={(e) => setName(e.target.value)} />
        <Button type="submit" variant="transparent" className="position-absolute end-0">
          <Search width={20} height={20} />
        </Button>
      </Form>
      {users?.content?.length > 0 ? (
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
              <th>Verificato</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.content?.map((user: IUser, index) => {
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
                    <Dropdown drop={"down-centered"}>
                      <Dropdown.Toggle disabled={user.id === authUser?.id} variant="primary" id="dropdown-basic" className="py-0 rounded-pill">
                        Ruolo
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item className="custom-dropdown-item" onClick={() => handleUserRole(user.id, "USER")}>
                          USER
                        </Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item" onClick={() => handleUserRole(user.id, "ADMIN")}>
                          ADMIN
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{dateConverter(user.registrationDate)}</td>
                  <td>
                    {user.isVerified && (
                      <div className="text-center">
                        <CheckAll width={30} height={30} />
                      </div>
                    )}
                  </td>
                  <td>
                    {user.id === authUser?.id ? (
                      <Trash opacity={0.5} />
                    ) : (
                      <Trash
                        className="mouseHover"
                        onClick={() => {
                          setShow(true);
                          setUserSelected(user.id);
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div className="text-center">
          <Alert>
            <ExclamationCircleFill className="me-2" />
            Nessun risultato!
          </Alert>
        </div>
      )}
      {users?.content?.length > 0 ? (
        <Row className="text-center mt-5">
          <Col>
            {page > 0 ? <ArrowLeftCircle className="mouseHover scale" width={30} height={30} onClick={() => setPage(page - 1)} /> : <ArrowLeftCircle width={30} height={30} style={{ opacity: 0.5 }} />}
          </Col>
          <Col>
            <Badge className="fs-6 rounded-pill">
              {page + 1}
              {" / "} {users?.totalPages}
            </Badge>
          </Col>
          <Col>
            {users?.totalPages !== page + 1 ? (
              <ArrowRightCircle className="mouseHover scale" width={30} height={30} onClick={() => setPage(page + 1)} />
            ) : (
              <ArrowRightCircle width={30} height={30} style={{ opacity: 0.5 }} />
            )}
          </Col>
        </Row>
      ) : null}
      <ModalAlert
        show={show}
        handleClose={handleClose}
        handleEvent={() => {
          dispatch(deleteUser(userSelected));
          handleClose();
        }}
      />
    </div>
  );
};

export default Users;
