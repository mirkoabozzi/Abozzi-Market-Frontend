import { Button, Dropdown, DropdownButton, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addDiscountOnProduct, deleteProduct, updateProduct, updateProductImage } from "../../redux/actions/products";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProductUpdateProps {
  show: boolean;
  handleClose: () => void;
}

const ProductUpdate = ({ show, handleClose }: IProductUpdateProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const product: IProduct = useAppSelector((state) => state.productReducer.product);
  const categories = useAppSelector((state) => state.categoriesReducer.categories);
  const discounts = useAppSelector((state) => state.discounts.content);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [quantityAvailable, setQuantityAvailable] = useState(1);
  const [category, setCategory] = useState("");
  const [image, setNewImage] = useState<File | null>(null);
  const [discount, setDiscount] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProductData: IProductUpdate = { name, description, price, quantityAvailable, category };
    await dispatch(updateProduct(newProductData, product.id));

    if (discount) {
      await dispatch(addDiscountOnProduct(discount, product.id));
      setDiscount("");
    }

    if (image) {
      await dispatch(updateProductImage(image, product.id));
    }
    handleClose();
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(product.id));
    navigate("/shop");
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setQuantityAvailable(product.quantityAvailable);
      setCategory(product.category.id);
    }
  }, [product]);

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica prodotto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Nome" value={name} required autoFocus onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control type="text" placeholder="Descrizione" required value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Prezzo</Form.Label>
            <Form.Control type="number" placeholder="Prezzo" required value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Quantità</Form.Label>
            <Form.Control type="number" placeholder="Quantità" required value={quantityAvailable} onChange={(e) => setQuantityAvailable(Number(e.target.value))} />
          </Form.Group>
          <Form.Group>
            <DropdownButton id="dropdown-basic-button" title={"Seleziona una categoria"} className="p-1">
              {categories?.map((category: ICategory) => {
                return (
                  <Dropdown.Item onClick={() => setCategory(category.id)} key={category.id}>
                    {category.name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <DropdownButton className="rounded-5 p-2 " title={"Seleziona offerta"}>
              {discounts.map((promo: DiscountListItem) => {
                return (
                  <Dropdown.Item key={promo.id} onClick={() => setDiscount(promo.id)}>
                    {promo.description} dal {promo.startDate} al {promo.endDate}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Form.Group>
          <Form.Group className="my-3" controlId="formAImage">
            <Form.Label>Immagine</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="submit" variant="primary">
              Invia
            </Button>
            <Button type="button" variant="danger" onClick={handleDeleteProduct}>
              Elimina
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default ProductUpdate;
