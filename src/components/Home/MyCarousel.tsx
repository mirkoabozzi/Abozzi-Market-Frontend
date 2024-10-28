import { Carousel, Col, Image, Row } from "react-bootstrap";
import spesa from "../../assets/img/spesa-online-1.png";
import consegna from "../../assets/img/domicilio.png";
import bag from "../../assets/img/bag.jpg";

const MyCarousel = () => {
  return (
    <Row className="justify-content-center mt-4">
      <Col xs="12" md="8">
        <Carousel data-bs-theme="dark" className="shadow-lg rounded-4">
          <Carousel.Item>
            <Image src={spesa} className="img-fluid border rounded-4" />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={consegna} className="img-fluid border rounded-4" />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={bag} className="img-fluid border rounded-4" />
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
  );
};

export default MyCarousel;
