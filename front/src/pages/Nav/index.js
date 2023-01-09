import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import WalletIcon from "@mui/icons-material/Wallet";
import SavingsIcon from "@mui/icons-material/Savings";
import { useNavigate } from "react-router-dom";
import CalculateIcon from "@mui/icons-material/Calculate";
import HistoryIcon from "@mui/icons-material/History";
import "./index.css";

const StyledNavButtom = styled(BottomNavigationAction)(() => ({
  minWidth: "50px",
  flexDirection: "column",
  "&:focus": {
    color: "#35794b",
  },
  "&:active": {
    color: "#35794b",
  },
  "&.Mui-selected": {
    color: "#35794b",
  },
}));

export default function Nav() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "100%", alignItems: "flex-end", display: "flex" }}>
      <BottomNavigation
        showLabels
        sx={{ width: "100%" }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        <StyledNavButtom
          label="Carteira"
          icon={<WalletIcon />}
          value="/carteira"
          className="button_nav"
        />
        <StyledNavButtom
          label="Renda"
          icon={<AttachMoneyIcon />}
          value="/renda"
        />
        <StyledNavButtom
          label="Gastos"
          icon={<MoneyOffIcon />}
          value="/gastos"
        />
        <StyledNavButtom
          label="Cofrinho"
          icon={<SavingsIcon />}
          value="/cofre"
        />
        <StyledNavButtom
          label="Calc"
          icon={<CalculateIcon />}
          value="/calculadora"
        />
        <StyledNavButtom
          label="Histórico"
          icon={<HistoryIcon />}
          value="/historico"
        />
      </BottomNavigation>
    </Box>
  );
}
