import { Col, Container, Image, Row } from "react-bootstrap";
import facebbok from "../../assets/img/facebook.svg";
import instagram from "../../assets/img/instagram.svg";
import visa from "../../assets/img/visa.svg";
import mastercard from "../../assets/img/mastercard.svg";
import paypal from "../../assets/img/paypal.svg";

const Footer = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="9">
          <Container className="footerContainer my-5">
            <Row>
              <Col className="d-flex px-0">
                <div className="p-3">
                  <a href="https://www.facebook.com/abozzimarket" title="Facebook">
                    <Image src={facebbok} alt="facebook icon" />
                  </a>
                </div>
                <div className="p-3">
                  <a href="https://www.instagram.com/abozzimarket" title="Instagram">
                    <Image src={instagram} alt="instagram icon" />
                  </a>
                </div>
              </Col>
            </Row>
            <Row sm="2" md="4">
              <Container>
                <p>Media Center</p>
                <p>Privacy</p>
                <p>Note legali</p>
              </Container>
              <Container>
                <p>Contattaci</p>
                <p>Lavora con noi</p>
              </Container>
              <Container>
                <p>Help Center</p>
                <p>Cookie</p>
              </Container>
              <Container>
                <p>Metodi di Pagamento</p>
                <Image src={visa} alt="visa logo" className="mx-1" />
                <Image src={mastercard} alt="mastercard logo" className="mx-1" />
                <Image src={paypal} alt="paypal logo" className="mx-1" />
              </Container>
            </Row>
            <div className="mt-3">
              <p>&copy; 2016-2024 Abozzi Market S.N.C. P.IVA 02644390904 - Via San Giacomo, 35 Sedini 07035</p>
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;