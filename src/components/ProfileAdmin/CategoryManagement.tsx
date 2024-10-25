import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { addCategory, addImageCategory, deleteCategory, updateCategory } from "../../redux/actions/categories";
import { ToastContainer } from "react-toastify";
import ModalAlert from "../ModalAlert/ModalAlert";

const CategoryManagement = () => {
  const categories = useAppSelector((state) => state.categoriesReducer.categories);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [avatar, setNewAvatar] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleCloseModalUpdate = () => setShowModalUpdate(false);
  const handleShowModalUpdate = () => setShowModalUpdate(true);

  const [showModalAlert, setShowModalAlert] = useState(false);
  const handleCloseModalAlert = () => setShowModalAlert(false);
  const handleShowModalAlert = () => {
    setShowModalUpdate(false);
    setShowModalAlert(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCategory: IAddCategory = { name };
    dispatch(addCategory(newCategory));
    setName("");
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateCategory(name, categoryId));
    setName("");
    if (avatar) {
      dispatch(addImageCategory(avatar, categoryId));
    }
    handleCloseModalUpdate();
  };

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(categoryId));
    handleCloseModalAlert();
  };

  return (
    <div className="mainAnimation">
      <h3 className="mb-4">Categorie</h3>
      <div className="text-center">
        <div className="d-flex flex-column flex-sm-row justify-content-sm-center">
          <Button className="rounded-pill" onClick={handleShow}>
            Aggiungi categoria
          </Button>
        </div>
        <Row className="mt-5">
          {categories?.map((category: ICategory) => {
            return (
              <Col
                xs={6}
                md={4}
                lg={2}
                key={category.id}
                className="text-center mouseHover scale"
                onClick={() => {
                  handleShowModalUpdate();
                  setCategoryId(category.id);
                  setName(category.name);
                }}
              >
                <Image height={100} width={100} src={category.image} alt="category image" className="border rounded-circle object-fit-cover shadow" />
                <p>{category.name}</p>
              </Col>
            );
          })}
        </Row>

        {/* modal add category*/}
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Aggiungi nuova categoria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Frutta" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" className="rounded-pill" onClick={handleClose}>
                  Chiudi
                </Button>
                <Button type="submit" variant="primary" className="rounded-pill" onClick={handleClose}>
                  Salva
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* modal edit category*/}
        <Modal centered show={showModalUpdate} onHide={handleCloseModalUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Frutta" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAvatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" className="rounded-pill" onClick={handleCloseModalUpdate}>
                  Chiudi
                </Button>
                <Button variant="danger" className="rounded-pill" onClick={handleShowModalAlert}>
                  Elimina
                </Button>
                <Button type="submit" variant="primary" className="rounded-pill" onClick={handleClose}>
                  Salva
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      {/* modal */}
      <ModalAlert show={showModalAlert} handleClose={handleCloseModalAlert} handleEvent={handleDeleteCategory} />
      <ToastContainer />
    </div>
  );
};

export default CategoryManagement;
