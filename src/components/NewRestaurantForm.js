import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { connect } from "react-redux";
import { createRestaurant } from "../store/restaurants/actions";

export function NewRestaurantForm({ createRestaurant }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createRestaurant(name);
    setName("");
  };

  const [name, setName] = useState("");
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add Restaurant"
        fullWidth
        variant="filled"
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
}

const mapStateToProps = null;
const mapDispatchToProps = { createRestaurant };

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
