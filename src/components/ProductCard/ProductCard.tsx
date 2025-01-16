import { Card } from "react-bootstrap";
import { CartPlus, StarFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { handleDiscountPrice } from "../../redux/actions/products";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ActionType } from "../../redux/enums/ActionType";
import { errorToast, successToast } from "../../redux/actions/toaster";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: IProduct;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart: IItem[] = useAppSelector((state) => state.cartReducer.content);
  const [rating, setRating] = useState(0);

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

  const handleAverageRate = () => {
    if (product?.reviewList?.length === 0) return 0;
    let value = 0;
    for (let i = 0; i < product.reviewList.length; i++) {
      value += product.reviewList[i].rating;
    }
    return value / product.reviewList.length;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<StarFill key={i} color={i < rating ? "gold" : "gray"} className="mx-1" />);
    }
    return stars;
  };

  useEffect(() => {
    setRating(handleAverageRate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.reviewList]);

  return (
    <Card className="rounded-3 h-100 cardHover">
      <Card.Img variant="top" src={product.imgUrl} alt={product.name} className="rounded-3 mouseHover p-2 object-fit-contain" onClick={() => navigate(`/product/details/${product.id}`)} height={200} />
      <Card.Body className="d-flex flex-column justify-content-end p-2">
        <Card.Title className="text-truncate">{product.name}</Card.Title>
        <Card.Text className="line-truncate-2 mb-2">{product.description}</Card.Text>
        <div className="mb-3">
          <span className="me-2">{rating.toFixed(1)}</span>
          {renderStars(rating)}
        </div>
        <div className="d-flex align-items-center">
          <strong className={!product?.discountStatus ? "fs-2 mb-0 flex-grow-1" : "fs-5 text-decoration-line-through mb-0"}>€ {product?.price.toFixed(2)}</strong>
          {product?.discountStatus && <strong className="text-danger fs-2 ms-3">-{product?.discountList[0]?.percentage}%</strong>}
          {!product?.discountStatus &&
            (product?.quantityAvailable === 0 ? <CartPlus className="fs-2" opacity={0.5} /> : <CartPlus className="fs-2 mouseHover scale" onClick={() => handleAddToCart(product)} />)}
        </div>
        <div className="d-flex align-items-center">
          {product?.discountStatus && <strong className="fs-2 mb-0 flex-grow-1">€ {handleDiscountPrice(product).toFixed(2)}</strong>}
          {product?.discountStatus &&
            (product?.quantityAvailable === 0 ? <CartPlus className="fs-2" opacity={0.5} /> : <CartPlus className="fs-2 mouseHover scale" onClick={() => handleAddToCart(product)} />)}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
