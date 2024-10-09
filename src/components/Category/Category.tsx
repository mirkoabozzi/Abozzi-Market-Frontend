import { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getCategories } from "../../redux/actions/categories";

const Category = () => {
  const categories: ICategory[] = useAppSelector((state) => state.categoriesReducer.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Container className="mb-4">
      <Row className="justify-content-between flex-nowrap overflow-x-auto">
        {categories?.map((category: ICategory) => {
          return (
            <Col key={category.id} className="text-center">
              <div>
                <Image src={category.image} alt="frutta" width={70} height={70} className="border rounded-circle object-fit-cover shadow" />
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
