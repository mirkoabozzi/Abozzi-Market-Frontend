import { Container, Image } from "react-bootstrap";
import insta1 from "../../assets/insta/insta1.avif";
import insta2 from "../../assets/insta/insta2.avif";
import insta3 from "../../assets/insta/insta3.avif";
import insta4 from "../../assets/insta/insta4.avif";
import insta5 from "../../assets/insta/insta5.avif";
import insta6 from "../../assets/insta/insta6.avif";
import insta7 from "../../assets/insta/insta7.avif";
import insta8 from "../../assets/insta/insta8.avif";
import insta9 from "../../assets/insta/insta9.avif";
import insta10 from "../../assets/insta/insta10.avif";
import insta11 from "../../assets/insta/insta11.avif";
import insta12 from "../../assets/insta/insta12.avif";
import insta13 from "../../assets/insta/insta13.avif";
import insta14 from "../../assets/insta/insta14.avif";

const slickArray = [insta1, insta2, insta3, insta4, insta5, insta6, insta7, insta8, insta9, insta10, insta11, insta12, insta13, insta14];
const duplicatedArray = [...slickArray, ...slickArray];

const MySlick = () => {
  return (
    <Container className="overflow-hidden gradient-mask">
      <div className="mySlick d-flex p-5 mt-2">
        {duplicatedArray &&
          duplicatedArray.map((img, i) => {
            return (
              <div key={i} className="rounded-4 mx-2">
                <Image src={img} alt="Products image" className="img-fluid border rounded-4 cardHover w-100 h-100" />
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default MySlick;
