import React, { useState } from "react";
import CalcBotao from "./components/CalcButton";
import * as math from "mathjs";
import "./index.css";

const Calculator = () => {
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
    alert("Copied the text: " + input);
  };

  return (
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
  );
};

export default Calculator;
