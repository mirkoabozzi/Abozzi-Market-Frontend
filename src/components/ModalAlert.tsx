import { Button, Modal } from "react-bootstrap";

interface ModalAlertProps {
  show: boolean;
  handleClose: () => void;
  handleEvent: () => void;
}

const ModalAlert = ({ show, handleClose, handleEvent }: ModalAlertProps) => {
  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma scelta</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vuoi eliminare il record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="danger" onClick={handleEvent}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAlert;
