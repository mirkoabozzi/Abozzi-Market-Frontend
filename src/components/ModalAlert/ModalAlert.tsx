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
        <Modal.Body>
          Vuoi eliminare il record?
          <hr />
          <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Button type="button" variant="secondary" className="rounded-pill" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="button" variant="danger" className="rounded-pill" onClick={handleEvent}>
              Conferma
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAlert;
