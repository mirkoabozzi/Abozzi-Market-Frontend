import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAllUser, updateUserRole } from "../../redux/actions/user";
import { Dropdown, Image, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const Users = () => {
  const users: IUser[] = useAppSelector((state) => state.userReducer.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const handleUserRole = (user: string, role: string) => {
    const body: IUserRole = { user, role };
    dispatch(updateUserRole(body));
  };

  return (
    <>
      <h3>Clienti</h3>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Email</th>
            <th>Ruolo</th>
            <th>Telefono</th>
            <th>Data registrazione</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser, index) => {
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
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Ruolo
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleUserRole(user.id, "USER")}>USER</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleUserRole(user.id, "ADMIN")}>ADMIN</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.registrationDate}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ToastContainer />
    </>
  );
};

export default Users;
