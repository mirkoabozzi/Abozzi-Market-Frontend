import "./MyNav.css";
import { Button, Container, Image, Navbar, Form, Nav, Badge } from "react-bootstrap";
import logo from "/src/assets/img/logo6.svg";
import logoRounded from "/src/assets/img/logo-rounded3.svg";
import { Cart4, Search } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getProductByName, getProducts } from "../../redux/actions/products";
import { ActionType } from "../../redux/enums/ActionType";

const MyNav = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogged: boolean = useAppSelector((state) => state.userReducer.isLogged);
  const user: IUser = useAppSelector((state) => state.userReducer.user);
  const cart: IItem[] = useAppSelector((state) => state.cartReducer.content);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [mainSearch, setMainSearch] = useState("");

  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleShowRegistration = () => setShowRegistration(true);
  const handleCloseRegistration = () => setShowRegistration(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch({ type: ActionType.SET_IS_LOGGED_FALSE });
    dispatch({ type: ActionType.SET_USER, payload: null });
    navigate("/");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: ActionType.SET_PRODUCTS_LOADED_TRUE });
    navigate("/shop");
    dispatch(getProductByName(mainSearch));
    setMainSearch("");
  };

  return (
    <div className="sticky-top z-3 myNav">
      <Navbar expand="sm" className="pb-0">
        <Container fluid className="justify-content-lg-between">
          <div className="me-2 mb-2 mouseHover" title="Home" onClick={() => navigate("/")}>
            <Image title="Home" src={logo} width="150" className="d-none d-sm-inline-block align-top" alt="Abozzi Market logo" />
            <Image title="Home" src={logoRounded} width="65" className="d-inline-block d-sm-none align-top" alt="Abozzi Market logo" />
          </div>
          <Form className="d-flex w-100 position-relative order-5 order-sm-0" onSubmit={handleSubmit}>
            <Form.Control type="search" placeholder="Di cosa hai bisogno oggi? " className="text-truncate" aria-label="Search" value={mainSearch} onChange={(e) => setMainSearch(e.target.value)} />
            <Button type="submit" variant="transparent" className="position-absolute end-0">
              <Search width={20} height={20} />
            </Button>
          </Form>
          {!isLogged ? (
            <>
              <Button type="button" variant="transparent" className="ms-auto ms-sm-2 rounded-pill" onClick={handleShowLogin}>
                Accedi
              </Button>
              <Button type="button" variant="transparent" className="ms-sm-2 rounded-pill" onClick={handleShowRegistration}>
                Registrati
              </Button>
            </>
          ) : (
            <>
              <div title="Account" className="d-flex flex-column align-items-center ms-auto ms-sm-3 mouseHover scale" onClick={() => navigate("/profile")}>
                <Image src={user?.avatar} alt="user image" width={40} height={40} className="border rounded-circle object-fit-cover shadow" />
                <p className="m-0 text-center">{user?.name}</p>
              </div>
              <Button type="button" variant="transparent" className="ms-auto ms-sm-2 rounded-pill" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          <div className="position-relative ms-auto ms-sm-0 scale">
            <Cart4 title="Carrello" width={40} height={40} className="m-2 mouseHover" onClick={() => navigate("/cart")} />
            <Badge bg="primary" pill={true} className="position-absolute top-0 end-0">
              {totalQuantity}
            </Badge>
          </div>
        </Container>
      </Navbar>
      <Navbar className="p-0">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
              <NavLink className="nav-link pt-1" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link pt-1" to="/shop" onClick={() => dispatch(getProducts(0))}>
                Shop
              </NavLink>
              <NavLink className="nav-link pt-1" to="/contact">
                Contatti
              </NavLink>
              <NavLink className="nav-link pt-1" to="/about">
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
