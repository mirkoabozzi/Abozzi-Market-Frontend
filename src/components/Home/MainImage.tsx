import "./Home.css";
import { Image } from "react-bootstrap";
import bag from "../../assets/img/bag.jpg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { setView } from "../../redux/slice/viewSlice";

const MainImage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setView(null));
    navigate("/shop");
  };

  return (
    <div className="mt-4 position-relative mouseHover scaleHome" onClick={handleClick}>
      <Image src={bag} alt="Bag" title="Shop" className="w-100 border rounded-3" />
    </div>
  );
};

export default MainImage;
