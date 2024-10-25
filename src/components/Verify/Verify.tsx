import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { url } from "../../redux/actions/user";
import { errorToast, successToast } from "../../redux/actions/toaster";
import { ToastContainer } from "react-toastify";

const Verify = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState("");

  const verifyFetch = async () => {
    try {
      const resp = await fetch(`${url}/authentication/verify/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (resp.ok) {
        // const result = await resp.json();
        successToast("Email verificata!");
      } else {
        errorToast("Verifica fallita!");
        throw new Error("Verify error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const path = window.location.pathname;
    const tokenFromPath = path.split("token=")[1];
    if (tokenFromPath) {
      setToken(tokenFromPath);
      if (token) {
        verifyFetch();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <Container className="mainAnimation mt-5 rounded-4 text-center">
        {/* <h1 className="mb-5">Conferma!</h1> */}
        <Button className="rounded-pill" onClick={() => navigate("/")}>
          Torna alla Home
        </Button>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Verify;
