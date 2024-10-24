import { Card } from "react-bootstrap";
import { CartPlus } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { handleDiscountPrice } from "../../redux/actions/products";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ActionType } from "../../redux/enums/ActionType";
import { errorToast, successToast } from "../../redux/actions/toaster";

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
    if (existingCartItem && existingCartItem?.product.quantityAvailable <= existingCartItem?.quantity) {
      errorToast("Quantità non disponibile!");
    } else {
      successToast("Articolo aggiunto");
      if (existingCartItem) {
        dispatch({ type: ActionType.UPDATE_QUANTITY, payload: { product: product, quantity: existingCartItem.quantity + quantity } });
      } else {
        dispatch({ type: ActionType.ADD_TO_CART, payload: { product, quantity } });
      }
    }
  };

  return (
    <Card className=" rounded-3 h-100 cardHover">
      <Card.Img variant="top" src={product.imgUrl} alt={product.name} className="rounded-3 mouseHover p-2 object-fit-contain" onClick={() => navigate(`/product/details/${product.id}`)} height={200} />
      <Card.Body className="d-flex flex-column justify-content-end p-2">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="line-truncate-2">{product.description}</Card.Text>
        <strong className={!product?.discountStatus ? "fs-1 mb-0" : "fs-5 text-decoration-line-through mb-0"}>€ {product?.price.toFixed(2)}</strong>
        {product?.discountStatus ? <strong className="fs-1 mb-0">€ {handleDiscountPrice(product).toFixed(2)}</strong> : null}
        <div className="d-flex justify-content-end">
          {product?.quantityAvailable === 0 ? <CartPlus className="fs-2 mouseHover scale" opacity={0.5} /> : <CartPlus className="fs-2 mouseHover scale" onClick={() => handleAddToCart(product)} />}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
