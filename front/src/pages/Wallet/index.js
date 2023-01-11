import React, { useState, useEffect } from "react";
import "./index.css";
import { Grid, Typography } from "@mui/material";
import CardAccordion from "../../components/CardAccordion";
import Card from "../../components/Card";
import { getRows } from "../../API/AddIncoming";
import { getBills } from "../../API/Bills.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavSlice from "../../store/reducers/NavReducers";

export default function Wallet() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [incoming, setIncoming] = useState(0);
  const [spending, setSpending] = useState(0);
  const [bills, setBills] = useState(0);
  const [paidBills, setPaidBills] = useState(0);
  const [profit, setProfit] = useState(0);
  const incomingArray = [
    { titles: ["1/2", "2/2"], values: ["R$1200", "R$1200"] },
  ];

  const init = async () => {
    let newIncoming = 0;
    let newSpending = 0;
    let newPaidBills = 0;
    let newBills = 0;

    await Promise.all([getRows(), getBills()]).then((res) => {
      res[0].map((item) => {
        newIncoming = newIncoming + item.value;
      });

      res[1].map((item) => {
        newSpending = newSpending + item.value;
        if (item.isChecked) {
          newPaidBills = newPaidBills + 1;
        } else {
          newBills = newBills + 1;
        }
      });
      setPaidBills(newPaidBills);
      setBills(newBills);
      setIncoming(newIncoming);
      setSpending(newSpending);
      setProfit(newIncoming - newSpending);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const changePage = (route) => {
    navigate(route);
    dispatch(NavSlice.actions.CHANGE_PAGE(route));
  };

  return (
    <Grid className="section_grid">
      <Typography variant="h5" className="title">
        Carteira
      </Typography>
      <CardAccordion
        title="Renda"
        value={`R$ ${incoming}`}
        afterEffect={() => changePage("/renda")}
        accordionDetails={incomingArray}
      />
      <Card
        title="Gastos"
        value={`R$ ${spending}`}
        isRed
        activateMotion
        afterEffect={() => changePage("/gastos")}
      />
      <Card
        title="Contas a Pagar"
        value={bills}
        isRed
        activateMotion
        afterEffect={() => changePage("/gastos")}
      />
      <Card
        title="Contas Pagas"
        value={paidBills}
        isRed={false}
        activateMotion
        afterEffect={() => changePage("/gastos")}
      />
      <Card
        title="Sobras"
        value={`R$ ${profit}`}
        isRed={false}
        activateMotion
        afterEffect={() => changePage("/cofre")}
      />
    </Grid>
  );
}
