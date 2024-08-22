import { render, screen } from "@testing-library/react";
import { RestaurantList } from "./RestaurantList";

describe("RestaurantList", () => {
  let loadRestaurants;

  function renderComponent(propOverrides = {}) {
    const props = {
      loadRestaurants: jest.fn().mockName("loadRestaurants"),
      restaurants: [
        { id: 1, name: "Sushi Place" },
        { id: 2, name: "Pizza Place" },
      ],
      loading: false,
      ...propOverrides,
    };

    loadRestaurants = props.loadRestaurants;

    render(<RestaurantList {...props} />);
  }

  it("loads restaurants on first render", () => {
    renderComponent();

    expect(loadRestaurants).toHaveBeenCalled();
  });

  describe("when loading succeeds", () => {
    it("displays the restaurants", () => {
      renderComponent();

      expect(screen.getByText("Sushi Place")).toBeInTheDocument();
      expect(screen.getByText("Pizza Place")).toBeInTheDocument();
    });

    it("displays the loading indicator while loading", () => {
      renderComponent({ loading: true });

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("does not display the loading indicator while not loading", () => {
      renderComponent();

      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });
});
