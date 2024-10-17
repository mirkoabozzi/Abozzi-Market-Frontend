import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { it, expect, describe } from "vitest";
import store from "../../redux/store";
import { MemoryRouter } from "react-router-dom";
import Users from "../../components/Profile/Users";
import userEvent from "@testing-library/user-event";

describe("Users", () => {
  it("should search name", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Cliente");
    const user = userEvent.setup();

    await user.type(searchInput, "Mirko");

    expect(searchInput).toHaveValue("Mirko");
  });
});
