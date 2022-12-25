import * as React from "react";
import { Grid, Typography } from "@mui/material";
import "./index.css";
import CardAccordion from "../../components/CardAccordion";
import Card from "../../components/Card";

export default function Incoming() {
  return (
    <Grid className="section_grid">
      <Typography variant="h5" className="title">
        Renda
      </Typography>
      <CardAccordion title="Renda" value="R$ 31000" />
      <Card title="Gastos" value="- R$ 1200" isRed />
      <Card title="Contas" value="3" isRed />
      <Card title="Contas Pagas" value="1" isRed={false} />
      <Card title="Sobras" value="R$ 14000" isRed={false} />
    </Grid>
  );
}
