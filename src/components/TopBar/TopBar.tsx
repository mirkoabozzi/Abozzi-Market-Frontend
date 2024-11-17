import { Container, Image } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import i1d from "../../assets/weather_icon/01d.svg";
import i1n from "../../assets/weather_icon/01n.svg";
import i2d from "../../assets/weather_icon/02d.svg";
import i2n from "../../assets/weather_icon/02n.svg";
import i3d from "../../assets/weather_icon/03d.svg";
import i3n from "../../assets/weather_icon/03n.svg";
import i4d from "../../assets/weather_icon/04d.svg";
import i4n from "../../assets/weather_icon/04n.svg";
import i9d from "../../assets/weather_icon/09d.svg";
import i9n from "../../assets/weather_icon/09n.svg";
import i10d from "../../assets/weather_icon/10d.svg";
import i10n from "../../assets/weather_icon/10n.svg";
import i11d from "../../assets/weather_icon/11d.svg";
import i11n from "../../assets/weather_icon/11n.svg";
import i13d from "../../assets/weather_icon/13d.svg";
import i13n from "../../assets/weather_icon/13n.svg";
import i50d from "../../assets/weather_icon/50d.svg";
import i50n from "../../assets/weather_icon/50n.svg";
import { getWeather } from "../../redux/actions/weather";

const TopBar = () => {
  const dispatch = useAppDispatch();
  const weather = useAppSelector((state) => state.weather.weather);

  const allIcon: { [key: string]: string } = {
    "01d": i1d,
    "01n": i1n,
    "02d": i2d,
    "02n": i2n,
    "03d": i3d,
    "03n": i3n,
    "04d": i4d,
    "04n": i4n,
    "09d": i9d,
    "09n": i9n,
    "10d": i10d,
    "10n": i10n,
    "11d": i11d,
    "11n": i11n,
    "13d": i13d,
    "13n": i13n,
    "50d": i50d,
    "50n": i50n,
  };

  useEffect(() => {
    dispatch(getWeather());
  }, [dispatch]);
  return (
    <Container fluid className="text-white text-center d-flex justify-content-between align-items-center" style={{ backgroundColor: "#1A51BF" }}>
      <small className="mb-0">Via San Giacomo, 35 &#183; 079587033 </small>
      {weather && (
        <div className="d-inline-block">
          <span>{weather.name}</span> <span>{(weather.main.temp - 273).toFixed(1) + "° "}</span>
          <Image className="mb-1" width={20} src={allIcon[weather.weather[0].icon]} alt="weather icon" />
        </div>
      )}
      <small>Via Nazionale, 65 &#183; 079588777</small>
    </Container>
  );
};

export default TopBar;
