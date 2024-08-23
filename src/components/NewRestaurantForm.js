import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { connect } from "react-redux";
import { createRestaurant } from "../store/restaurants/actions";
import Alert from "@mui/material/Alert";

export function NewRestaurantForm({ createRestaurant }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      setValidationError(true);
    } else {
      setValidationError(false);
      await createRestaurant(name);
    }

    setName("");
  };

  const [name, setName] = useState("");
  const [validationError, setValidationError] = useState(false);
  return (
    <>
      {validationError && <Alert severity="error">Name is required</Alert>}
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
    </>
  );
}

const mapStateToProps = null;
const mapDispatchToProps = { createRestaurant };

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
