import React, { useEffect, useState } from "react";
import "./index.css";
import { Grid, Typography } from "@mui/material";
import Card from "../../components/Card";
import { getHistory } from "../../API/History";
import DefaultTable from "../../components/Table";

export default function History() {
  const [history, setHistory] = useState([]);
  const [openMonth, setOpenMonth] = useState(false);
  const [rows, setRows] = useState([]);
  const headers = ["Conta", "Valor", "Prazo", ""];

  const init = async () => {
    await getHistory().then((res) => {
      setHistory(res);
    });
  };

  useEffect(() => {
    init();
    setOpenMonth(false);
  }, []);

  const changeOpenedMonth = (bills) => {
    setRows(bills);
    setOpenMonth(true);
  };

  return (
    <Grid className="grid_table">
      <Typography variant="h5" className="title">
        Historico
      </Typography>
      {openMonth ? (
        <DefaultTable rows={rows} rowsHeader={headers} />
      ) : (
        history.map((item, index) => {
          const profit = item.incoming - item.spending;
          return (
            <Card
              title={item.month}
              value={`R$${profit}`}
              isRed={profit < 0}
              activateMotion
              afterEffect={() => changeOpenedMonth(item.bills)}
            />
          );
        })
      )}
    </Grid>
  );
}
