import React from "react";
import "./index.css";
import { Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CalcBotao = ({ children, onClick, isInput, copyResult }) => {
  const ehNum = (val) => {
    if (!isNaN(val) || val === "C" || val === ".") {
      return true;
    }
    return false;
  };

  const ehIgual = (val) => {
    if (val === "=") {
      return true;
    }
    return false;
  };

  const StyledButton = styled(Button)(() => ({
    "&:focus": {
      backgroundColor: ehIgual(children)
        ? "#A6CE95"
        : !ehNum(children)
        ? "#35794b"
        : null,
      color: ehIgual(children)
        ? "#000000"
        : !ehNum(children)
        ? "#fff"
        : "#35794b",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.4em",
    flex: 1,
    outline: "1px solid #A6CE95",
    height: "3.5em",
    backgroundColor: ehIgual(children)
      ? "#A6CE95"
      : !ehNum(children)
      ? "#35794b"
      : null,
    color: ehIgual(children)
      ? "#000000"
      : !ehNum(children)
      ? "#fff"
      : "#35794b",
  }));

  const StyledIconButton = styled(IconButton)(() => ({ color: "#fff" }));

  return (
    <>
      {isInput ? (
        <div className="input">
          <StyledIconButton onClick={copyResult}>
            <ContentCopyIcon />
          </StyledIconButton>
          <div className="input_text">{children}</div>
        </div>
      ) : (
        <StyledButton onClick={() => onClick(children)}>
          {children}
        </StyledButton>
      )}
    </>
  );
};

export default CalcBotao;
