import * as React from "react";
import { Typography, Grid } from "@mui/material";
import "./index.css";

export default function Card(props) {
  return (
    <Grid container className="grid_card_details card shadow">
      <Grid item xs={props.hasBigTitle ? 5.5 : 3} className="green_box">
        <Typography className="text_cards white_text">{props.title}</Typography>
      </Grid>
      <Grid item xs={props.hasBigTitle ? 6.5 : 9} className="white_box">
        <Typography
          className={`text_cards ${props.isRed ? "red_text" : "green_text"}`}
        >
          {props.value}
        </Typography>
      </Grid>
    </Grid>
  );
}
