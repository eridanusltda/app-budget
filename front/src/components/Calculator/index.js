import React, { useState } from "react";
import CalcBotao from "./components/CalcButton";
import { Snackbar } from "@mui/material";
import * as math from "mathjs";
import "./index.css";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Calculator = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const arrOperacoes = ["*", "/", "+", ".", "-"];

  const [input, setInput] = useState("");

  function insereNum(val) {
    setInput(input + val);
  }

  function insereOperacao(val) {
    if (
      input === "" ||
      (arrOperacoes.includes(input[input.length - 1]) &&
        arrOperacoes.includes(val))
    ) {
      return;
    } else {
      setInput(input + val);
    }
  }

  function calcular() {
    if (input === "" || arrOperacoes.includes(input[input.length - 1])) {
      return input;
    } else {
      const result = math.evaluate(input);
      setInput(result.toString());
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(input);
    setIsSnackbarOpen(true);
  };

  return (
    <>
      <div className="calc-wrapper">
        <CalcBotao isInput copyResult={copyResult}>
          {input}
        </CalcBotao>
        <div className="linha">
          <CalcBotao onClick={insereNum}>7</CalcBotao>
          <CalcBotao onClick={insereNum}>8</CalcBotao>
          <CalcBotao onClick={insereNum}>9</CalcBotao>
          <CalcBotao onClick={insereOperacao}>/</CalcBotao>
        </div>
        <div className="linha">
          <CalcBotao onClick={insereNum}>4</CalcBotao>
          <CalcBotao onClick={insereNum}>5</CalcBotao>
          <CalcBotao onClick={insereNum}>6</CalcBotao>
          <CalcBotao onClick={insereOperacao}>*</CalcBotao>
        </div>
        <div className="linha">
          <CalcBotao onClick={insereNum}>1</CalcBotao>
          <CalcBotao onClick={insereNum}>2</CalcBotao>
          <CalcBotao onClick={insereNum}>3</CalcBotao>
          <CalcBotao onClick={insereOperacao}>+</CalcBotao>
        </div>
        <div className="linha">
          <CalcBotao onClick={insereOperacao}>.</CalcBotao>
          <CalcBotao onClick={insereNum}>0</CalcBotao>
          <CalcBotao onClick={() => setInput("")}>C</CalcBotao>
          <CalcBotao onClick={insereOperacao}>-</CalcBotao>
        </div>
        <div className="linha">
          <CalcBotao onClick={calcular}>=</CalcBotao>
        </div>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert onClose={() => setIsSnackbarOpen(false)} sx={{ width: "100%" }}>
          Valor copiado!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Calculator;
