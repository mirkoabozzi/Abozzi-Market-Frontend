import { useState } from "react";
import { Button, Dropdown, DropdownMenu, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addProduct } from "../../redux/actions/products";
import { errorToast } from "../../redux/actions/toaster";

const AddProduct = () => {
  const categories: ICategory[] = useAppSelector((state) => state.categoriesReducer.categories);
  const dispatch = useAppDispatch();

  const [category, setCategory] = useState<ICategory | null>();
  const [newProduct, setNewProduct] = useState<IProductAdd>({ name: "", description: "", price: 1, quantityAvailable: 1, category: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleCategory = (selectedCategory: ICategory) => {
    setCategory(selectedCategory);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) {
      errorToast("Categoria obbligatoria!");
    } else {
      dispatch(addProduct({ ...newProduct, category: category.id }));
      setNewProduct({ name: "", description: "", price: 1, quantityAvailable: 1, category: "" });
      setCategory(null);
    }
  };

  return (
    <div className="mainAnimation">
      <h3 className="mb-4">Prodotti</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Nome" required autoFocus name="name" value={newProduct.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control type="text" placeholder="Descrizione" required name="description" value={newProduct.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Prezzo</Form.Label>
          <Form.Control type="number" placeholder="Prezzo" min={0} step={"0.01"} required name="price" value={newProduct.price} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNumber">
          <Form.Label>Quantità disponibile</Form.Label>
          <Form.Control type="number" placeholder="Quantità disponibile" min={0} required name="quantityAvailable" value={newProduct.quantityAvailable} onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Dropdown drop={"down-centered"} className="d-flex flex-column flex-sm-row">
            <Dropdown.Toggle id="dropdown-basic" className="rounded-pill">
              {category ? category.name : "Seleziona una categoria"}
            </Dropdown.Toggle>
            <DropdownMenu>
              {categories?.map((category: ICategory) => {
                return (
                  <Dropdown.Item className="custom-dropdown-item" onClick={() => handleCategory(category)} key={category.id}>
                    {category.name}
                  </Dropdown.Item>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </Form.Group>
        <div className="d-flex flex-column flex-sm-row justify-content-sm-center mt-4">
          <Button type="submit" variant="primary" className="rounded-pill">
            Aggiungi prodotto
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
