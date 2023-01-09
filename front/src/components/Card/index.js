import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import "./index.css";
import { motion } from "framer-motion/dist/framer-motion";

export default function Card(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Grid container className="grid_card_details card shadow">
      {!isOpen && (
        <Grid className="green_box">
          <Typography className="text_cards white_text">
            {props.title}
          </Typography>
        </Grid>
      )}
      <motion.div
        layout
        className="white_box"
        data-isOpen={isOpen}
        onClick={() => props.activateMotion && setIsOpen(!isOpen)}
      >
        <Typography
          className={`text_cards ${props.isRed ? "red_text" : "green_text"}`}
        >
          {props.value}
        </Typography>
      </motion.div>
    </Grid>
  );
}
