import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Container>
      <h1 className="my-4">Abozzi Market</h1>
      <div data-aos="fade-left">
        <h2>Italiano</h2>
        <p className="textPretty">
          Abozzi Market offre una vasta gamma di prodotti: pane fresco, frutta e verdura fresca, carni fresche, prodotti tipici sardi, casalinghi, cura persona e tanto altro. Vieni a trovarci nei
          nostri punti vendita a Sedini in Via San Giacomo 35 e Via Nazionale 65 e scopri le nostre offerte. Nei mesi estivi siamo aperti anche la domenica mattina dalle 8:00 alle 13:00 in Via
          Nazionale 65. Abozzi Market, ottimo servizio e alta qualità.
        </p>
      </div>
      <div data-aos="fade-left">
        <h2>English</h2>
        <p className="textPretty">
          Abozzi Market offers you a wide choice of products: fresh bread, fresh meat, fresh fruits and vegetables, typical Sardinian products, personal care and more. Come to us in our shop in Sedini
          in Via San Giacomo 35 and Via Nazionale 65 to discover our offers. In summer time we are open also on Sunday morning from 8:00 to 13:00 in Via Nazionale 65. Abozzi Market: great service and
          high quality.
        </p>
      </div>
      <div data-aos="fade-left">
        <h2>Francois</h2>
        <p className="textPretty">
          Abozzi Market vous offre une large gamme de produits: pain et viande frais, fruits et légumes, produits typiques de notre territoire, produits de nettoyage, soins de beauté et autre encore.
          Rendez-vous sur nos points de vente en Sedini, Via San Giacomo 35 et Via Nazionale 65 pour découvrir nos offres. Pendant l'été on restera ouvert aussi le dimanche matin dès 8.00 jusqu'à
          13.00 en Via Nazionale 65. Abozzi Market: excellent service et de haute qualité.
        </p>
      </div>
      <div data-aos="fade-left">
        <h2>Espanol</h2>
        <p className="textPretty">
          Abozzi Market ofrece una amplia gama de productos: pan fresco, fruta y verdura, carne fresca, productos típicos de Cerdeña, productos para la casa, cuidado personal y mucho más. Ven a
          visitarnos en los puntos de venta en Sedini, Via Nazionale 65 y Via San Giacomo 35 y descubre nuestras ofertas. En los meses de verano estamos abiertos el domingo por la mañana desde las
          8:00 hasta las 13:00 en el punto de venta en Via Nazionale 65. Abozzi Market: gran servicio y calidad elevada.
        </p>
      </div>
      <h2 data-aos="fade-left" className="mt-5">
        Dove siamo?
      </h2>
      <Row data-aos="fade-left">
        <Col xs={12} className="maps">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.138866304493!2d8.81152419016746!3d40.853340397559414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12dc735d2d0c47c3%3A0x6ddfd2d7a8000c13!2sVia%20S.%20Giacomo%2C%2035%2C%2007035%20Sedini%20SS!5e1!3m2!1sit!2sit!4v1728565984753!5m2!1sit!2sit"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
