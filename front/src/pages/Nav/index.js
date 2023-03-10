import * as React from "react";
import "./index.css";
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
import { useDispatch, useSelector } from "react-redux";
import NavSlice from "../../store/reducers/NavReducers";
import HistorySlice from "../../store/reducers/HistoryReducers";
import { ReactComponent as PigIcon } from "../../assets/savings.svg";
import { ReactComponent as PigIconGreen } from "../../assets/savings_green.svg";

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
  const dispatch = useDispatch();
  const navRedux = useSelector((state) => state.navReducers);

  return (
    <Box sx={{ width: "100%", alignItems: "flex-end", display: "flex" }}>
      <BottomNavigation
        className="stickToBottom"
        showLabels
        sx={{ width: "100%" }}
        value={navRedux.currentPage}
        onChange={(event, newValue) => {
          dispatch(NavSlice.actions.CHANGE_PAGE(newValue));
          dispatch(HistorySlice.actions.OPEN_MONTH(false));
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
          icon={
            navRedux.currentPage === "/cofre" ? (
              <PigIconGreen style={{ maxWidth: 24 }} />
            ) : (
              <PigIcon style={{ maxWidth: 24 }} />
            )
          }
          value="/cofre"
        />
        <StyledNavButtom
          label="Hist??rico"
          icon={<HistoryIcon />}
          value={`/historico`}
        />
        <StyledNavButtom
          label="Calc"
          icon={<CalculateIcon />}
          value="/calculadora"
        />
      </BottomNavigation>
    </Box>
  );
}
