import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import ProductCard from "../../components/ProductCard/ProductCard";
import { MemoryRouter } from "react-router-dom";

describe("ProductCard Component", () => {
  const product: IProduct = {
    id: "1234",
    name: "Nutella",
    description: "Cioccolato",
    price: 1.99,
    quantityAvailable: 7,
    createdAt: "2024-10-02T00:00:00",
    lastUpdate: "2024-10-12T16:37:30.864451",
    imgUrl: "https://example.com/mirko",
    discountStatus: false,
    category: {
      id: "ef0255a1-c7a6-4369-bac0-430979f2d0cb",
      name: "Dolci",
      image: "https://example.com/mirkoabozzi",
    },
    discountList: [],
  };

  it("should render product name, description, price, and image", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={product} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nutella/i)).toBeInTheDocument();
    expect(screen.getByText(/Cioccolato/i)).toBeInTheDocument();
    expect(screen.getByText(/1.99/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/mirko");
  });
});
