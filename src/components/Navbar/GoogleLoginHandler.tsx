import { url } from "../../redux/actions/user";
import { Image } from "react-bootstrap";
import g from "../../assets/img/google.svg";

interface GoogleLoginHandlerProp {
  buttonTitle: string;
}

const GoogleLoginHandler = ({ buttonTitle }: GoogleLoginHandlerProp) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <a href={url + "/oauth2/authorization/google"} className="nav-link">
          <div className="mb-2 d-flex align-items-center gap-2 border border-2 py-1 px-3 rounded">
            <Image src={g} width={30} height={30} />
            <span>{buttonTitle}</span>
          </div>
        </a>
      </div>
      <div>
        <p className="text-center mb-0">o</p>
      </div>
    </>
  );
};

export default GoogleLoginHandler;
