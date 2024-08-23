import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewRestaurantForm } from "./NewRestaurantForm";

describe("NewRestaurantForm", () => {
  const restaurantName = "Sushi Place";
  let createRestaurant;
  const requiredError = "Name is required";

  function renderComponent() {
    createRestaurant = jest.fn().mockName("createRestaurant");
    render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  }

  describe("initially", () => {
    it("does not display a validation error", () => {
      renderComponent();

      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });
  });

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

    it("does not display a validation error", async () => {
      await fillInForm();
      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });
  });

  describe("when empty", () => {
    async function submitEmptyForm() {
      renderComponent();

      await userEvent.click(screen.getByText("Add"));
    }

    it("displays a validation error", async () => {
      await submitEmptyForm();

      expect(screen.getByText(requiredError)).toBeInTheDocument();
    });

    it("does not call createRestaurant", async () => {
      await submitEmptyForm();

      expect(createRestaurant).not.toHaveBeenCalled();
    });
  });

  describe("when correcting a validation error", () => {
    async function fixValidationError() {
      renderComponent();

      // empty form
      createRestaurant.mockResolvedValue();
      await userEvent.click(screen.getByText("Add"));

      // fill in name
      await userEvent.type(
        screen.getByPlaceholderText("Add Restaurant"),
        restaurantName
      );
      await userEvent.click(screen.getByText("Add"));

      // renderComponent();
      // createRestaurant.mockResolvedValue();

      // userEvent.click(screen.getByText("Add"));

      // await userEvent.type(
      //   screen.getByPlaceholderText("Add Restaurant"),
      //   restaurantName
      // );
      // userEvent.click(screen.getByText("Add"));
    }

    it("clears the validation error", async () => {
      await fixValidationError();
      // expect(screen.queryByText("Name is required")).not.toBeInTheDocument();
      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });
  });
});
