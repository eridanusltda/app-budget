import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import "./index.css";
import CardAccordion from "../../components/CardAccordion";
import Card from "../../components/Card";
import { getRows } from "../../API/AddIncoming";

export default function Wallet() {
  const [incoming, setIncoming] = useState(0);
  const init = async () => {
    await getRows().then((res) => {
      let newIncoming = 0;
      res.map((item) => {
        newIncoming = newIncoming + item.value;
      });
      setIncoming(newIncoming);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Grid className="section_grid">
      <Typography variant="h5" className="title">
        Carteira
      </Typography>
      <CardAccordion title="Renda" value={`R$ ${incoming}`} />
      <Card title="Gastos" value="- R$ 1200" isRed />
      <Card title="Contas" value="3" isRed />
      <Card title="Contas Pagas" value="1" isRed={false} />
      <Card title="Sobras" value="R$ 14000" isRed={false} />
    </Grid>
  );
}
