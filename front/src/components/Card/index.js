import * as React from "react";
import { Typography, Grid } from "@mui/material";
import "./index.css";

export default function Card(props) {
  return (
    <Grid container className="grid_card_details card">
      <Grid item xs={3} className="green_box">
        <Typography className="text_cards white_text">1/2</Typography>
      </Grid>
      <Grid item xs={9} className="white_box">
        <Typography className="text_cards green_text">R$ 20000</Typography>
      </Grid>
    </Grid>
  );
}
