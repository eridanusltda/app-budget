import { Grid } from "@mui/material";
import "./App.css";
import Nav from "./pages/Nav";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wallet from "./pages/Wallet";

function App() {
  return (
    <Router>
      <Grid container className="App-header">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carteira" element={<Wallet />} />
          <Route path="/renda" element={<Wallet />} />
          <Route path="/carteira" element={<Wallet />} />
          <Route path="/carteira" element={<Wallet />} />
          <Route path="/carteira" element={<Wallet />} />
          <Route path="/carteira" element={<Wallet />} />
        </Routes>
      </Grid>
    </Router>
  );
}

export default App;
