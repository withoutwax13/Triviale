import { Grid } from "@mui/material";
import ThemedLayout from "./components/ThemedLayout";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <ThemedLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <p>Main content</p>
        </Grid>
      </Grid>
    </ThemedLayout>
  );
}

export default App;
