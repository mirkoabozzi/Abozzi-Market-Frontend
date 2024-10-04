import { Carousel, Col, Image, Row } from "react-bootstrap";
import spesa from "../../assets/img/spesa-online-1.png";
import consegna from "../../assets/img/domicilio.png";

const MyCarousel = () => {
  return (
    <Row className="justify-content-center">
      <Col xs="12" lg="10">
        <Carousel data-bs-theme="dark" className="shadow-lg rounded-4">
          <Carousel.Item>
            <Image src={spesa} className="img-fluid border rounded-4" />
            <Carousel.Caption>
              <h3>Spesa Online</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src={consegna} className="img-fluid border rounded-4" />
            <Carousel.Caption>
              <h3>Consegna a domicilio</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
  );
};

export default MyCarousel;
