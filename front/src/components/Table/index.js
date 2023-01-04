import React from "react";
import "./index.css";
import { Paper, Typography, Grid, Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "10px",
  height: "100%",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#35794b",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 13,
}));

const StyledCheckbox = styled(Checkbox)(() => ({
  padding: "0 5px 0 0",
}));

export default function DefaultTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.rowsHeader.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows &&
            props.rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  <Grid className="name_checkbox">
                    {props.deleteActive ? (
                      <DeleteForeverIcon
                        className="cancel_button"
                        onClick={() => props.handleDelete(row.id)}
                      />
                    ) : (
                      <StyledCheckbox
                        checked={row.isChecked}
                        color="success"
                        onClick={() => props.toggleTask(row)}
                      />
                    )}
                    <StyledTypography
                      className={row.isChecked && "todo-completed"}
                    >
                      {row.font}
                    </StyledTypography>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTypography>R$ {row.value}</StyledTypography>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTypography>
                    {moment(row.date).format("l")}
                  </StyledTypography>
                </StyledTableCell>
                <StyledTableCell>
                  <EditIcon onClick={() => props.handleEdit(row)} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
