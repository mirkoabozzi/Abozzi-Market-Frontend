import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { addCategory, addImageCategory, deleteCategory } from "../../redux/actions/categories";

const CategoryManagement = () => {
  const categories = useAppSelector((state) => state.categoriesReducer.categories);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [avatar, setNewAvatar] = useState<File | null>(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModalImage, setShowModalImage] = useState(false);
  const handleCloseModalImage = () => setShowModalImage(false);
  const handleShowModalImage = () => setShowModalImage(true);

  const [categoryId, setCategoryId] = useState("");
  console.log(categoryId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCategory: IAddCategory = { name };
    dispatch(addCategory(newCategory));
  };

  const handleSubmitImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (avatar) {
      dispatch(addImageCategory(avatar, categoryId));
    }
  };

  const handleDeleteCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteCategory(categoryId));
  };

  return (
    <div>
      <h3>Categrie</h3>
      <Button onClick={handleShow}>Aggiungi categoria</Button>
      <Row className="mt-5">
        {categories?.map((category) => {
          return (
            <Col
              key={category.id}
              className="text-center"
              onClick={() => {
                handleShowModalImage();
                setCategoryId(category.id);
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
              <Button variant="secondary" onClick={handleClose}>
                Chiudi
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Salva
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* modal add image*/}
      <Modal show={showModalImage} onHide={handleCloseModalImage}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi immagine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitImage}>
            <Form.Group className="mb-3" controlId="formAvatar">
              <Form.Label>Avatar</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModalImage}>
                Chiudi
              </Button>
              <Button type="submit" variant="primary" onClick={handleClose}>
                Salva
              </Button>
              <Button type="button" variant="warning" onClick={handleDeleteCategory}>
                Elimina
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
