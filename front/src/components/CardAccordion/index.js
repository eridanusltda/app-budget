import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Typography, Grid } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  marginTop: "10px",
  borderRadius: "0px  10px",
  backgroundColor: "transparent",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 10,
  borderRadius: "0px  10px",
  backgroundColor: "rgba(255, 255, 255, 0.93);",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  padding: 0,
}));

export default function CardAccordion(props) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Grid container className="grid_card">
            <Grid item xs={3} className="green_box">
              <Typography className="text_cards white_text">
                {props.title}
              </Typography>
            </Grid>
            <Typography className="text_cards green_text">
              {props.value}
            </Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className="grid_card_details">
            <Grid item xs={3} className="green_box">
              <Typography className="text_cards white_text">1/2</Typography>
              <Typography className="text_cards white_text">2/2</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography className="text_cards green_text">
                R$ 20000
              </Typography>
              <Typography className="text_cards green_text">
                R$ 11000
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
