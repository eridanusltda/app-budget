import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import "./index.css";
import CardAccordion from "../../components/CardAccordion";
import Card from "../../components/Card";

export default function Wallet() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <Grid className="section_grid">
      <Typography className="title">Carteira</Typography>
      <CardAccordion title="Renda" value="R$ 31000" />
      <Card />
    </Grid>
  );
}
