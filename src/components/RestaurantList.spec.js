import { render, screen } from "@testing-library/react";
import { RestaurantList } from "./RestaurantList";

describe("RestaurantList", () => {
  let loadRestaurants;

  function renderComponent() {
    loadRestaurants = jest.fn().mockName("loadRestaurants");
    const restaurants = [
      { id: 1, name: "Sushi Place" },
      { id: 2, name: "Pizza Place" },
    ];

    render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />
    );
  }

  it("loads restaurants on first render", () => {
    renderComponent();

    expect(loadRestaurants).toHaveBeenCalled();
  });

  it("displays the restaurants", () => {
    renderComponent();

    expect(screen.getByText("Sushi Place")).toBeInTheDocument();
    expect(screen.getByText("Pizza Place")).toBeInTheDocument();
  });
});
