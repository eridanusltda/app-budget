import React from "react";
import { Grid, Typography } from "@mui/material";
import Calculator from "../../components/Calculator";

export default function CalculatorPage() {
  return (
    <Grid className="section_grid">
      <Typography variant="h5" className="title">
        Calculadora
      </Typography>
      <Calculator />
    </Grid>
  );
}
