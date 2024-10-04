import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const Category = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const getCategory = async () => {
    try {
      const resp = await fetch("http://localhost:3001/categories");
      if (resp.ok) {
        const result = await resp.json();
        setCategories(result.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Container className="mb-4">
      <Row className="justify-content-between flex-nowrap overflow-x-auto">
        {categories.map((category) => {
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
