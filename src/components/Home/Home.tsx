import { Container } from "react-bootstrap";
import MyCarousel from "./MyCarousel";
import Suggested from "./Suggested";
import MySlick from "./MySlick";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { getUser } from "../../redux/actions/user";
import { ActionType } from "../../redux/enums/ActionType";
// import MainImage from "./MainImage";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("accessToken", token);
      dispatch(getUser());
      dispatch({ type: ActionType.SET_IS_LOGGED_TRUE });
    }
  }, [dispatch]);

  return (
    <Container className="mt-3 mainAnimation">
      <h1 className="text-center">Abozzi Market Spesa Online</h1>
      {/* <MainImage /> */}
      <MyCarousel />
      <MySlick />
      <Suggested />
    </Container>
  );
};

export default Home;
