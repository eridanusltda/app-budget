import React, { useEffect, useState } from "react";
import "./index.css";
import { Grid, TextField, Typography } from "@mui/material";
import { changeSavings, getSavings } from "../../API/History";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import { ReactComponent as PigIconGreen } from "../../assets/savings_green.svg";
import { ReactComponent as PigIconBrokenGreen } from "../../assets/savings_broken_green.svg";
import TitleWithButtons from "../../components/TitleWithButtons";
import InputAdornment from "@mui/material/InputAdornment";
import NavSlice from "../../store/reducers/NavReducers";

export default function Profit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [savings, setSavings] = useState();
  const [temporarySavings, setTemporarySavings] = useState(savings);
  const [isEditing, setIsEditing] = useState(false);
  const [pigSize, setPigSize] = useState("20vw");

  const changePigSize = (savingsValue) => {
    const isNegative = savingsValue < 0 ? true : false;
    switch (true) {
      case savingsValue >= -500 && isNegative:
        setPigSize("20vw");
        break;
      case savingsValue <= -1000 && savingsValue > -2000 && isNegative:
        setPigSize("30vw");
        break;
      case savingsValue <= -2000 && savingsValue > -3000 && isNegative:
        setPigSize("40vw");
        break;
      case savingsValue <= -3000 && savingsValue > -4000 && isNegative:
        setPigSize("50vw");
        break;
      case savingsValue <= -4000 && savingsValue > -5000 && isNegative:
        setPigSize("60vw");
        break;
      case savingsValue <= -5000 && savingsValue > -10000 && isNegative:
        setPigSize("70vw");
        break;
      case savingsValue <= -10000 && isNegative:
        setPigSize("80vw");
        break;
      case savingsValue <= 500 && !isNegative:
        setPigSize("20vw");
        break;
      case savingsValue >= 1000 && savingsValue < 2000 && !isNegative:
        setPigSize("30vw");
        break;
      case savingsValue >= 2000 && savingsValue < 3000 && !isNegative:
        setPigSize("40vw");
        break;
      case savingsValue >= 3000 && savingsValue < 4000 && !isNegative:
        setPigSize("50vw");
        break;
      case savingsValue >= 4000 && savingsValue < 5000 && !isNegative:
        setPigSize("60vw");
        break;
      case savingsValue >= 5000 && savingsValue < 10000 && !isNegative:
        setPigSize("70vw");
        break;
      case savingsValue >= 10000 && !isNegative:
        setPigSize("80vw");
        break;
      default:
        setPigSize("80vw");
    }
  };

  const init = async () => {
    await getSavings().then((res) => {
      setSavings(res.currentBalance);
      changePigSize(res.currentBalance);
      dispatch(NavSlice.actions.CHANGE_PAGE("/cofre"));
    });
  };

  const editSavings = async () => {
    const payload = { currentBalance: temporarySavings };
    await changeSavings(payload).then((res) => {
      setSavings(res.currentBalance);
      changePigSize(res.currentBalance);
      setIsEditing(false);
    });
  };

  const cancelEditing = () => {
    setTemporarySavings(savings);
    setIsEditing(false);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setTemporarySavings(savings);
  }, [savings]);

  return (
    <Grid className="grid_table">
      <TitleWithButtons
        title="Lucro"
        handleClose={cancelEditing}
        handleEdit={() => setIsEditing(true)}
        isCloseButton={isEditing}
        isEditButton
        hideDeleteButton
      />
      <Grid
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "80%",
        }}
      >
        {savings > 0 ? (
          <PigIconGreen style={{ maxWidth: pigSize }} />
        ) : (
          <PigIconBrokenGreen style={{ maxWidth: pigSize }} />
        )}
        <Grid container justifyContent="center" className="savings">
          <Typography variant="h5" className="gray_text space_total">
            Total:{" "}
          </Typography>
          {isEditing ? (
            <Grid>
              <TextField
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                type="number"
                value={temporarySavings}
                onChange={(e) => setTemporarySavings(e.target.value)}
              />
              <SaveIcon onClick={editSavings} className="add_button" />
            </Grid>
          ) : (
            <Typography
              variant="h5"
              className={savings > 0 ? "green_text" : "red_text"}
            >
              R${savings}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
