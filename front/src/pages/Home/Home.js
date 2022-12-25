import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return <Grid>home</Grid>;
}
