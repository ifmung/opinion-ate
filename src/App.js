import { Provider } from "react-redux";
import { RestaurantScreen } from "./components/RestaurantScreen";
import store from "./store";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const theme = createTheme({
  palette: {
    primary: green,
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Opinion Ate</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <RestaurantScreen />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
