import React, { useEffect, useState } from "react";
import "./index.css";
import {
  Paper,
  Checkbox,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BasicModal from "../../components/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import moment from "moment";
import { getRows, postRow, deleteRow } from "../../API/AddIncoming";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "10px",
  height: "100%",
  tableCell: {
    color: "red",
  },
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

export default function CustomizedTables() {
  const [addNewIncoming, setAddNewIncoming] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const [deleteActive, setDeleteActive] = useState(false);

  const init = async () => {
    await getRows().then((res) => {
      setNewRows(res);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      font: "",
      money: "",
      dueDate: "",
    },
  });
  const onSubmit = async (data) => {
    const payload = {
      font: data.font,
      value: data.money,
      date: data.dueDate,
      isChecked: false,
    };
    await postRow(payload).then(() => {
      init();
    });

    setAddNewIncoming(false);
    reset();
  };

  const handleClose = () => setAddNewIncoming(false);
  const newLine = () => {
    setAddNewIncoming(true);
  };

  const handleDelete = async (id) => {
    await deleteRow(id).then(() => init());
  };

  const toggleTask = (index) => {
    const newTasks = [...newRows];
    newTasks[index].isChecked = !newTasks[index].isChecked;
    setNewRows(newTasks);
  };
  return (
    <Grid className="grid_table">
      <Grid container className="title_with_buttons">
        {deleteActive ? (
          <CloseIcon
            className="delete_button"
            onClick={() => setDeleteActive(false)}
          />
        ) : (
          <DeleteForeverIcon
            className="delete_button"
            onClick={() => setDeleteActive(true)}
          />
        )}
        <Typography variant="h5" className="title">
          Renda
        </Typography>
        <AddIcon className="add_button" onClick={newLine} />
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="tableCell">Fonte</StyledTableCell>
              <StyledTableCell>Valor</StyledTableCell>
              <StyledTableCell>Data</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newRows.map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>
                  <Grid className="name_checkbox">
                    {deleteActive ? (
                      <DeleteForeverIcon
                        className="cancel_button"
                        onClick={() => handleDelete(row.id)}
                      />
                    ) : (
                      <Checkbox
                        checked={row.isChecked}
                        color="success"
                        onClick={() => toggleTask(index)}
                      />
                    )}
                    <Typography className={row.isChecked && "todo-completed"}>
                      {row.font}
                    </Typography>
                  </Grid>
                </StyledTableCell>
                <StyledTableCell>R$ {row.value}</StyledTableCell>
                <StyledTableCell>{row.date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BasicModal
        open={addNewIncoming}
        handleClose={handleClose}
        title="Add sua nova renda"
      >
        <Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputLabel>Fonte</InputLabel>

            <Controller
              name="font"
              rules={{ required: true }}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  error={!!error}
                  helperText={error && error.message}
                  {...field}
                  className="padding_form"
                  variant="standard"
                />
              )}
            />
            <InputLabel className="padding_form">Valor</InputLabel>
            <Controller
              name="money"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  mask="R$"
                  type="number"
                  error={!!error}
                  helperText={error && error.message}
                  className="padding_form"
                  variant="standard"
                />
              )}
            />
            <InputLabel className="padding_form">Data</InputLabel>
            <Controller
              name="dueDate"
              control={control}
              rules={{ required: true }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    error={!!error}
                    value={value}
                    helperText={error && error.message}
                    views={["year", "month", "date"]}
                    onChange={onChange}
                    renderInput={(params) => (
                      <TextField variant="standard" {...params} />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
            <Controller
              name="recurrent"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Grid container alignItems="center">
                  <Checkbox checked={value} onChange={onChange} />
                  <InputLabel>Recorrente</InputLabel>
                </Grid>
              )}
            />
            <Grid container>
              <Button type="submit">Salvar</Button>
              <Button onClick={getRows}>Cancelar</Button>
            </Grid>
          </form>
        </Grid>
      </BasicModal>
    </Grid>
  );
}
