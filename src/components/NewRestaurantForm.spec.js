import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewRestaurantForm } from "./NewRestaurantForm";

describe("NewRestaurantForm", () => {
  const restaurantName = "Sushi Place";
  let createRestaurant;

  function renderComponent() {
    createRestaurant = jest.fn().mockName("createRestaurant");
    render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  }

  describe("when filled in", () => {
    async function fillInForm() {
      renderComponent();
      createRestaurant.mockResolvedValue();
      await userEvent.type(
        screen.getByPlaceholderText("Add Restaurant"),
        restaurantName
      );
      await userEvent.click(screen.getByText("Add"));
    }

    it("calls createRestaurant with the name", async () => {
      await fillInForm();

      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it("clears the name", async () => {
      await fillInForm();

      expect(screen.getByPlaceholderText("Add Restaurant").value).toEqual("");
    });
  });
});
