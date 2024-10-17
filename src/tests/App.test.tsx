import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("H1 is in the document", () => {
  it("should Render h1", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    screen.debug();

    expect(screen.getByText(/abozzi market spesa online/i)).toBeInTheDocument();
  });
});
