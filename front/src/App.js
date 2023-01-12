import React from "react";
import { Grid } from "@mui/material";
import "./App.css";
import Nav from "./pages/Nav";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wallet from "./pages/Wallet";
import Incoming from "./pages/Incoming";
import Bills from "./pages/Bills";
import CalculatorPage from "./pages/CalculatorPage";
import History from "./pages/History";
import Profit from "./pages/Profit";

function App() {
  return (
    <Router>
      <Grid container className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carteira" element={<Wallet />} />
          <Route path="/renda" element={<Incoming />} />
          <Route path="/gastos" element={<Bills />} />
          <Route path="/calculadora" element={<CalculatorPage />} />
          <Route path="/cofre" element={<Profit />} />
          <Route path={`/historico/:month?/:year?`} element={<History />} />
        </Routes>
      </Grid>
      <Nav />
    </Router>
  );
}

export default App;
