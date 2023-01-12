import React from "react";
import { Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

export default function TitleWithButtons(props) {
  return (
    <Grid container className="title_with_buttons">
      {props.deleteActive ? (
        <CloseIcon className="delete_button" onClick={props.handleClose} />
      ) : !props.hideDeleteButton ? (
        <DeleteForeverIcon
          className="delete_button"
          onClick={props.handleDelete}
        />
      ) : (
        <Grid item xs={1} />
      )}
      <Typography variant="h5" className="title">
        {props.title}
      </Typography>
      {props.isEditButton ? (
        props.isCloseButton ? (
          <CloseIcon className="delete_button" onClick={props.handleClose} />
        ) : (
          <EditIcon className="add_button" onClick={props.handleEdit} />
        )
      ) : (
        <AddIcon className="add_button" onClick={props.handleAdd} />
      )}
    </Grid>
  );
}
