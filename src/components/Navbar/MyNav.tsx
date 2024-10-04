import { Button, Container, Image, Navbar, Form, Nav, Badge } from "react-bootstrap";
import logo from "/src/assets/img/logo4.svg";
import logoRounded from "/src/assets/img/logo-rounded.svg";
import { Cart4, Search } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MyNav = () => {
  const navigate = useNavigate();
  const isLogged = useSelector((state: RootState) => state.userReducer.isLogged);
  const user = useSelector((state: RootState) => state.userReducer.user);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleShowRegistration = () => setShowRegistration(true);
  const handleCloseRegistration = () => setShowRegistration(false);

  return (
    <div className="sticky-top z-3" style={{ backgroundColor: "#eef5fb" }}>
      <Navbar expand="sm" className="pb-0">
        <Container fluid className="justify-content-lg-between">
          <div className="me-2 mb-2 mouseHover" title="Home" onClick={() => navigate("/")}>
            <Image title="Home" src={logo} width="150" className="d-none d-sm-inline-block align-top" alt="Abozzi Market logo" />
            <Image title="Home" src={logoRounded} width="65" className="d-inline-block d-sm-none align-top" alt="Abozzi Market logo" />
          </div>
          <Form className="d-flex w-100 position-relative order-5 order-sm-0">
            <Form.Control type="search" placeholder="Di cosa hai bisogno oggi? " className="text-truncate" aria-label="Search" />
            <Button variant="transparent" className="position-absolute end-0">
              <Search width={20} height={20} />
            </Button>
          </Form>
          {!isLogged ? (
            <>
              <Button variant="transparent" className="ms-auto ms-sm-2" style={{ color: "#1A51BF" }} onClick={handleShowLogin}>
                Accedi
              </Button>
              <Button variant="transparent" className="ms-sm-2" style={{ color: "#1A51BF" }} onClick={handleShowRegistration}>
                Registrati
              </Button>
            </>
          ) : (
            <>
              <div title="Account" className="ms-auto ms-sm-2 mouseHover" onClick={() => navigate("/profile")}>
                <Image src={user?.avatar} alt="frutta" width={40} height={40} className="border rounded-circle object-fit-cover shadow" />
                <p className="m-0 text-center">{user?.name}</p>
              </div>
            </>
          )}
          <div className="position-relative ms-auto ms-sm-0">
            <Cart4 title="Carrello" width={40} height={40} className="m-2 mouseHover" onClick={() => navigate("/cart")} />
            <Badge bg="primary" pill={true} className="position-absolute top-0 end-0">
              0
            </Badge>
          </div>
        </Container>
      </Navbar>
      <Navbar className="pt-0">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
              <NavLink className="nav-link" style={({ isActive }) => (isActive ? { color: "#1A51BF", borderBottom: "2px solid #1A51BF" } : { color: "" })} to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" style={({ isActive }) => (isActive ? { color: "#1A51BF", borderBottom: "2px solid #1A51BF" } : { color: "" })} to="/shop">
                Shop
              </NavLink>
              <NavLink className="nav-link" style={({ isActive }) => (isActive ? { color: "#1A51BF", borderBottom: "2px solid #1A51BF" } : { color: "" })} to="/promozioni">
                Promozioni
              </NavLink>
              <NavLink className="nav-link" style={({ isActive }) => (isActive ? { color: "#1A51BF", borderBottom: "2px solid #1A51BF" } : { color: "" })} to="/contatti">
                Contatti
              </NavLink>
              <NavLink className="nav-link" style={({ isActive }) => (isActive ? { color: "#1A51BF", borderBottom: "2px solid #1A51BF" } : { color: "" })} to="/about">
                Chi siamo
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* modal */}
      <Login show={showLogin} handleClose={handleCloseLogin} />
      <Registration show={showRegistration} handleClose={handleCloseRegistration} />
    </div>
  );
};
export default MyNav;
