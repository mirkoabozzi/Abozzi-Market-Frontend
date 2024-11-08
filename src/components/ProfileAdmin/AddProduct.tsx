import { useState } from "react";
import { Button, Dropdown, DropdownMenu, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addProduct } from "../../redux/actions/products";
import { errorToast } from "../../redux/actions/toaster";

const AddProduct = () => {
  const categories: ICategory[] = useAppSelector((state) => state.categoriesReducer.categories);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [quantityAvailable, setQuantityAvailable] = useState(1);
  const [category, setCategory] = useState<ICategory | null>();

  const handleCategory = (selectedCategory: ICategory) => {
    setCategory(selectedCategory);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) {
      errorToast("Categoria obbligatoria!");
    } else {
      const newProduct: IProductAdd = {
        name: name,
        description: description,
        price: price,
        quantityAvailable: quantityAvailable,
        category: category.id,
      };
      dispatch(addProduct(newProduct));
      setName("");
      setDescription("");
      setPrice(1);
      setQuantityAvailable(1);
      setCategory(null);
    }
  };

  return (
    <div className="mainAnimation">
      <h3 className="mb-4">Prodotti</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Nome" required autoFocus value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control type="text" placeholder="Descrizione" required value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Prezzo</Form.Label>
          <Form.Control type="number" placeholder="Prezzo" required value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNumber">
          <Form.Label>Quantità disponibile</Form.Label>
          <Form.Control type="number" placeholder="Quantità disponibile" required value={quantityAvailable} onChange={(e) => setQuantityAvailable(Number(e.target.value))} />
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
