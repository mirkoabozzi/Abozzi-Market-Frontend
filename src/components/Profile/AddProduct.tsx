import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, FormGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addProduct } from "../../redux/actions/products";
import { Bounce, toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const categories = useAppSelector((state) => state.categoriesReducer.categories);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [quantityAvailable, setquantityAvailable] = useState(1);
  const [category, setCategory] = useState<ICategory | null>();

  const handleCategory = (selectedCategory: ICategory) => {
    setCategory(selectedCategory);
  };

  const tostError = (text: string) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) {
      tostError("Categoria obbligatoria!");
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
      setquantityAvailable(1);
      setCategory(null);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Nome" required autoFocus value={name} onChange={(e) => setName(e.target.value)} />
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
          <Form.Label>Quantità dispnibile</Form.Label>
          <Form.Control type="number" placeholder="Quantità disponibile" required value={quantityAvailable} onChange={(e) => setquantityAvailable(Number(e.target.value))} />
        </Form.Group>
        <FormGroup>
          <DropdownButton id="dropdown-basic-button" title={category ? category.name : "Seleziona una categoria"}>
            {categories?.map((category: ICategory) => {
              return (
                <Dropdown.Item onClick={() => handleCategory(category)} key={category.id}>
                  {category.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </FormGroup>
        <div className="text-center mt-5">
          <Button type="submit" variant="primary">
            Aggiungi prodotto
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </>
  );
};

export default AddProduct;