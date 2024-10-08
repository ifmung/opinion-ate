import { useEffect } from "react";
import { connect } from "react-redux";
import { loadRestaurants } from "../store/restaurants/actions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

export function RestaurantList({
  loadRestaurants,
  restaurants,
  loading,
  loadError,
}) {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return (
    <>
      {loading && <CircularProgress />}
      {loadError && (
        <Alert severity="error">Restaurants could not be loaded.</Alert>
      )}
      <List>
        {restaurants.map((restaurant) => (
          <ListItem key={restaurant.id}>
            <ListItemText>{restaurant.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

const mapDispatchToProps = { loadRestaurants };

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants.records,
    loading: state.restaurants.loading,
    loadError: state.restaurants.loadError,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
