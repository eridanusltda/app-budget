import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import CalculateIcon from "@mui/icons-material/Calculate";
import WalletIcon from "@mui/icons-material/Wallet";
import SavingsIcon from "@mui/icons-material/Savings";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Nav() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        <BottomNavigationAction
          label="Carteira"
          icon={<WalletIcon />}
          value="/carteira"
        />
        <BottomNavigationAction
          label="Renda"
          icon={<AttachMoneyIcon />}
          value="/renda"
        />
        <BottomNavigationAction
          label="Gastos"
          icon={<MoneyOffIcon />}
          value="/gastos"
        />
        <BottomNavigationAction
          label="Cofrinho"
          icon={<SavingsIcon />}
          value="/cofre"
        />
        {/* <BottomNavigationAction
          label="Histórico"
          icon={<HistoryIcon />}
          value="/historico"
        />
        <BottomNavigationAction
          label="Calculadora"
          icon={<CalculateIcon />}
          value="/calc"
        /> */}
      </BottomNavigation>
    </Box>
  );
}
