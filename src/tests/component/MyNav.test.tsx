import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import MyNav from "../../components/Navbar/MyNav";
import store from "../../redux/store";
import { MemoryRouter } from "react-router-dom";
import { ActionType } from "../../redux/enums/ActionType";

describe("MyNav", () => {
  it("should show login and registration button if not logged", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyNav />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Accedi")).toBeInTheDocument();
    expect(screen.getByText("Registrati")).toBeInTheDocument();
  });

  it("should show logout button", () => {
    store.dispatch({ type: ActionType.SET_IS_LOGGED_TRUE });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyNav />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});
