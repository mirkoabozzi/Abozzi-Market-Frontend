import "./Category.css";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getCategories } from "../../redux/actions/categories";
import { useNavigate } from "react-router-dom";
import { getProductByCategory } from "../../redux/actions/products";
import { setView } from "../../redux/slice/viewSlice";

const Category = () => {
  const categories: ICategory[] = useAppSelector((state) => state.categoriesReducer.categories);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    dispatch(setView("category"));
    dispatch(getProductByCategory(categoryName, 0));
    navigate(`/shop`, { state: { category: categoryName } });
  };

  return (
    <Container className="my-1">
      <Row className="justify-content-between flex-nowrap custom-scrollbar">
        {categories?.map((category: ICategory) => {
          return (
            <Col key={category.id} className="text-center categoryHover p-3">
              <div className="mouseHover" onClick={() => handleClick(category.name)}>
                <Image src={category.image} alt={category.name} width={70} height={70} className="border rounded-circle object-fit-cover shadow" />
              </div>
              <small>{category.name}</small>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Category;
