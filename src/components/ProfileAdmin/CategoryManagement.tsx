import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { addCategory, addImageCategory, deleteCategory, updateCategory } from "../../redux/actions/categories";
import { ToastContainer } from "react-toastify";

const CategoryManagement = () => {
  const categories = useAppSelector((state) => state.categoriesReducer.categories);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [avatar, setNewAvatar] = useState<File | null>(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleCloseModalUpdate = () => setShowModalUpdate(false);
  const handleShowModalUpdate = () => setShowModalUpdate(true);

  const [categoryId, setCategoryId] = useState("");

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

  const handleDeleteCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteCategory(categoryId));
    handleCloseModalUpdate();
  };

  return (
    <div className="mainAnimation">
      <h3>Categorie</h3>
      <div className="text-center">
        <Button className="rounded-pill" onClick={handleShow}>
          Aggiungi categoria
        </Button>
        <Row className="mt-5">
          {categories?.map((category: ICategory) => {
            return (
              <Col
                key={category.id}
                className="text-center mouseHover"
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Aggiungi nuova categoria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Frutta" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" className="rounded-pill" onClick={handleClose}>
                  Chiudi
                </Button>
                <Button type="submit" variant="primary" className="rounded-pill" onClick={handleClose}>
                  Salva
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>

        {/* modal edit category*/}
        <Modal show={showModalUpdate} onHide={handleCloseModalUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Frutta" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAvatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" className="rounded-pill" onClick={handleCloseModalUpdate}>
                  Chiudi
                </Button>
                <Button variant="danger" className="rounded-pill" onClick={handleDeleteCategory}>
                  Elimina
                </Button>
                <Button type="submit" variant="primary" className="rounded-pill" onClick={handleClose}>
                  Salva
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoryManagement;
