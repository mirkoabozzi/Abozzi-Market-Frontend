import { Container } from "react-bootstrap";
import MyCarousel from "./MyCarousel";
import Suggested from "./Suggested";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <Container className="mt-3">
      <h1 className="text-center">Abozzi Market Spesa Online</h1>
      <MyCarousel />
      <Suggested />
      <ToastContainer />
    </Container>
  );
};

export default Home;
