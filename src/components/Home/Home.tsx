import { Container } from "react-bootstrap";
import MyCarousel from "./MyCarousel";
import Suggested from "./Suggested";
import { ToastContainer } from "react-toastify";
import MySlick from "./MySlick";

const Home = () => {
  return (
    <>
      <Container className="mt-3 mainAnimation">
        <h1 className="text-center">Abozzi Market Spesa Online</h1>
        <MyCarousel />
        <MySlick />
        <Suggested />
      </Container>
      <ToastContainer />
    </>
  );
};

export default Home;
