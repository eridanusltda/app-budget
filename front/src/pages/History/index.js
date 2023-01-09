import React, { useEffect, useState } from "react";
import "./index.css";
import { Grid, Typography } from "@mui/material";
import Card from "../../components/Card";
import { getHistory } from "../../API/History";
import { motion } from "framer-motion/dist/framer-motion";

export default function History() {
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const init = async () => {
    await getHistory().then((res) => {
      setHistory(res);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Grid className="grid_table">
      <Typography variant="h5" className="title">
        Historico
      </Typography>
      {history.map((item, index) => {
        const profit = item.incoming - item.spending;
        return (
          <Card
            title={item.month}
            value={`R$${profit}`}
            isRed={profit < 0}
            activateMotion
          />
        );
      })}
    </Grid>
  );
}
