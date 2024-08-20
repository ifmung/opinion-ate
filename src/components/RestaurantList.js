import { useEffect } from "react";

export function RestaurantList({ loadRestaurants }) {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);
  return "list";
}
