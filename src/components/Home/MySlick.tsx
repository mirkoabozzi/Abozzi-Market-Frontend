import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "react-bootstrap";
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

const MySlick = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    speed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: false,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container my-4">
      <Slider {...settings}>
        {slickArray &&
          slickArray.map((img, i) => {
            return (
              <div key={i}>
                <Image src={img} className="img-fluid border rounded-4" />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default MySlick;
