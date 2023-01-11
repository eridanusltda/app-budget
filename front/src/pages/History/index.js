import React, { useEffect, useState } from "react";
import "./index.css";
import { Grid, Typography } from "@mui/material";
import Card from "../../components/Card";
import { getHistory } from "../../API/History";
import DefaultTable from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import HistorySlice from "../../store/reducers/HistoryReducers";
import NavSlice from "../../store/reducers/NavReducers";
import { useNavigate } from "react-router-dom";
import CardAccordion from "../../components/CardAccordion";

export default function History() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const historyRedux = useSelector((state) => state.historyReducers);
  const [history, setHistory] = useState([]);
  const [rows, setRows] = useState([]);
  const [month, setMonth] = useState();
  const headers = ["Conta", "Valor", "Prazo", ""];

  const init = async () => {
    await getHistory().then((res) => {
      setHistory(res);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const changeOpenedMonth = (item, year) => {
    setRows(item.bills);
    setMonth(item.month);
    dispatch(HistorySlice.actions.OPEN_MONTH(true));
    dispatch(NavSlice.actions.CHANGE_PAGE("/historico"));
    navigate(`${item.month.toLowerCase()}/${year}`);
  };

  return (
    <Grid className="grid_table">
      <Typography variant="h5" className="title">
        {historyRedux.openMonth ? month : "Historico"}
      </Typography>
      {historyRedux.openMonth ? (
        <DefaultTable rows={rows} rowsHeader={headers} />
      ) : (
        <Grid className="max_height">
          {history.map((year) => {
            return (
              <CardAccordion
                title={year.year}
                value={year.profit}
                accordionComponent={year.months.map((item) => {
                  console.log(item.month);
                  const profit = item.incoming - item.spending;
                  return (
                    <Card
                      title={item.month}
                      hasSmallMargin
                      value={`R$${profit}`}
                      isRed={profit < 0}
                      activateMotion
                      afterEffect={() => changeOpenedMonth(item, year.year)}
                    />
                  );
                })}
              />
            );
          })}
        </Grid>
      )}
    </Grid>
  );
}
