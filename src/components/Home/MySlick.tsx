import { Container, Image } from "react-bootstrap";
import insta1 from "../../assets/insta/insta1.jpg";
import insta2 from "../../assets/insta/insta2.jpg";
import insta3 from "../../assets/insta/insta3.jpg";
import insta4 from "../../assets/insta/insta4.jpg";
import insta5 from "../../assets/insta/insta5.jpg";
import insta6 from "../../assets/insta/insta6.jpg";
import insta7 from "../../assets/insta/insta7.jpg";
import insta8 from "../../assets/insta/insta8.jpg";
import insta9 from "../../assets/insta/insta9.jpg";
import insta10 from "../../assets/insta/insta10.jpg";
import insta11 from "../../assets/insta/insta11.jpg";
import insta12 from "../../assets/insta/insta12.jpg";
import insta13 from "../../assets/insta/insta13.jpg";
import insta14 from "../../assets/insta/insta14.jpg";

const slickArray = [insta1, insta2, insta3, insta4, insta5, insta6, insta7, insta8, insta9, insta10, insta11, insta12, insta13, insta14];
const duplicatedArray = [...slickArray, ...slickArray];

const MySlick = () => {
  return (
    <Container className="overflow-hidden">
      <div className="mySlick d-flex p-5 mt-2">
        {duplicatedArray &&
          duplicatedArray.map((img, i) => {
            return (
              <div key={i} className="rounded-4 mx-2">
                <Image src={img} className="img-fluid border rounded-4 cardHover w-100 h-100" />
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default MySlick;
