import { Card } from "react-bootstrap";
import { CartPlus } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { handleDiscountPrice } from "../../redux/actions/products";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ActionType } from "../../redux/enums/ActionType";
import { successToast } from "../../redux/actions/toaster";

interface ProductCardProps {
  product: IProduct;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart: IItem[] = useAppSelector((state) => state.cartReducer.content);

  const handleAddToCart = (product: IProduct) => {
    const existingCartItem = cart.find((item: IItem) => item.product.id === product.id);
    const quantity = 1;
    if (existingCartItem) {
      dispatch({ type: ActionType.UPDATE_QUANTITY, payload: { product: product, quantity: existingCartItem.quantity + quantity } });
    } else {
      dispatch({ type: ActionType.ADD_TO_CART, payload: { product, quantity } });
    }
    successToast("Articolo aggiunto");
  };

  return (
    <Card className=" rounded-3 h-100 cardHover">
      <Card.Img variant="top" src={product.imgUrl} className=" rounded-3 mouseHover" onClick={() => navigate(`/product/details/${product.id}`)} />
      <Card.Body className="d-flex flex-column justify-content-end">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="line-truncate-2">{product.description}</Card.Text>
        <p className="fs-2">€ {handleDiscountPrice(product).toFixed(2)}</p>
        <div className="d-flex justify-content-end">
          <CartPlus className="fs-2 mouseHover scale" onClick={() => handleAddToCart(product)} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
