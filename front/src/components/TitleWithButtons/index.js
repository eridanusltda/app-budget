import React from "react";
import { Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";

export default function TitleWithButtons(props) {
  return (
    <Grid container className="title_with_buttons">
      {props.deleteActive ? (
        <CloseIcon className="delete_button" onClick={props.handleCancel} />
      ) : (
        <DeleteForeverIcon
          className="delete_button"
          onClick={props.handleDelete}
        />
      )}
      <Typography variant="h5" className="title">
        {props.title}
      </Typography>
      <AddIcon className="add_button" onClick={props.handleAdd} />
    </Grid>
  );
}
