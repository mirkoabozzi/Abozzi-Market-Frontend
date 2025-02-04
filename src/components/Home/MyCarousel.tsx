import { Carousel, Col, Image, Row } from "react-bootstrap";
import spesa from "../../assets/img/spesa-online-1.avif";
import consegna from "../../assets/img/domicilio.avif";
import bag from "../../assets/img/bag.avif";
import MetaTags from "../MetaTags";

const MyCarousel = () => {
  return (
    <Row className="justify-content-center mt-4">
      <MetaTags title="Abozzi Market" description="Da Abozzi Market troverai una vasta gamma di prodotti alimentari e non da poter acquistare." image={spesa} />
      <Col xs="12" md="8">
        <Carousel data-bs-theme="dark" className="shadow-lg rounded-4">
          <Carousel.Item>
            <Image src={spesa} alt="Cart" className="img-fluid border rounded-4" />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={consegna} alt="Motorcycle" className="img-fluid border rounded-4" />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={bag} alt="Bag" className="img-fluid border rounded-4" />
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
  );
};

export default MyCarousel;
