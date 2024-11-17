import { Button, Dropdown, DropdownMenu, Form, Modal, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addDiscountOnProduct, dateConverter, deleteDiscountFromProduct, deleteProduct, updateProduct, updateProductImage } from "../../redux/actions/products";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash } from "react-bootstrap-icons";
import ModalAlert from "../ModalAlert/ModalAlert";
import { getCategories } from "../../redux/actions/categories";
import { getAllDiscounts } from "../../redux/actions/discount";

interface IProductUpdateProps {
  show: boolean;
  handleClose: () => void;
}

const ProductUpdate = ({ show, handleClose }: IProductUpdateProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const product: IProduct = useAppSelector((state) => state.productReducer.product);
  const categories: ICategory[] = useAppSelector((state) => state.categoriesReducer.categories);
  const discounts: DiscountListItem[] = useAppSelector((state) => state.discounts.content);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [quantityAvailable, setQuantityAvailable] = useState(1);
  const [category, setCategory] = useState("");
  const [image, setNewImage] = useState<File | null>(null);
  const [discount, setDiscount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategoryName, setSelectedCategoryName] = useState("Seleziona categoria");
  const [selectedDiscountName, setSelectedDiscountName] = useState("Seleziona offerta");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const newProductData: IProductUpdate = { name, description, price, quantityAvailable, category };
    await dispatch(updateProduct(newProductData, product.id));

    if (discount) {
      await dispatch(addDiscountOnProduct(discount, product.id));
      setDiscount("");
    }

    if (image) {
      await dispatch(updateProductImage(image, product.id));
    }
    setIsLoading(false);
    handleClose();
  };

  const handleDeleteProduct = async () => {
    await dispatch(deleteProduct(product.id));
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

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllDiscounts());
  }, [dispatch]);

  const handleDeleteDiscount = (discountId: string) => {
    const discount = { discount: discountId };
    dispatch(deleteDiscountFromProduct(product.id, discount));
  };

  return (
    <>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica prodotto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Nome" value={name} required autoFocus onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control type="text" placeholder="Descrizione" required value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control type="number" placeholder="Prezzo" min={0} step={"0.01"} required value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>Quantità</Form.Label>
              <Form.Control type="number" placeholder="Quantità" min={0} required value={quantityAvailable} onChange={(e) => setQuantityAvailable(Number(e.target.value))} />
            </Form.Group>
            <Form.Group>
              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                <Dropdown drop={"down-centered"} className="d-flex flex-column flex-sm-row">
                  <Dropdown.Toggle id="dropdown-basic" className="rounded-pill">
                    {selectedCategoryName}
                  </Dropdown.Toggle>
                  <DropdownMenu>
                    {categories?.map((category: ICategory) => {
                      return (
                        <Dropdown.Item
                          className="custom-dropdown-item"
                          onClick={() => {
                            setCategory(category.id);
                            setSelectedCategoryName(category.name);
                          }}
                          key={category.id}
                        >
                          {category.name}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown drop={"down-centered"} className="d-flex flex-column flex-sm-row">
                  <Dropdown.Toggle id="dropdown-basic" className="rounded-pill">
                    {selectedDiscountName}
                  </Dropdown.Toggle>
                  <DropdownMenu>
                    {discounts?.length === 0 ? (
                      <Dropdown.Item className="custom-dropdown-item" onClick={() => navigate("/profile/promo")}>
                        Aggiungi offerta
                      </Dropdown.Item>
                    ) : null}
                    {discounts?.map((promo: DiscountListItem) => {
                      return (
                        <Dropdown.Item
                          className="custom-dropdown-item"
                          key={promo.id}
                          onClick={() => {
                            setDiscount(promo.id);
                            setSelectedDiscountName(promo.description);
                          }}
                        >
                          {promo.description} dal {dateConverter(promo.startDate)} al {dateConverter(promo.endDate)}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </div>
              {product?.discountList.map((discount: DiscountListItem) => {
                return (
                  <div key={discount.id}>
                    <p className="mb-1 mt-3">
                      Offerta attiva: {discount.description} <Trash className="mouseHover" onClick={() => handleDeleteDiscount(discount.id)} />
                    </p>
                    <p>Termina: {dateConverter(discount.endDate)}</p>
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group className="my-3" controlId="formAImage">
              <Form.Label>Immagine</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Button type="button" variant="secondary" className="rounded-pill" onClick={handleClose}>
                Chiudi
              </Button>
              <Button
                type="button"
                variant="danger"
                className="rounded-pill"
                onClick={() => {
                  handleShowDeleteModal();
                  handleClose();
                }}
              >
                Elimina
              </Button>
              <Button type="submit" variant="primary" className="rounded-pill">
                {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Invia"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ModalAlert show={showDeleteModal} handleClose={handleCloseDeleteModal} handleEvent={handleDeleteProduct} />
    </>
  );
};

export default ProductUpdate;
