import React, { useEffect, useState } from "react";
import "./index.css";
import { Checkbox, Grid, TextField, InputLabel, Button } from "@mui/material";
import BasicModal from "../../components/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { getRows, postRow, deleteRow, editRow } from "../../API/AddIncoming";
import DefaultTable from "../../components/Table";
import TitleWithButtons from "../../components/TitleWithButtons";

export default function Incoming() {
  const [addNewIncoming, setAddNewIncoming] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const [deleteActive, setDeleteActive] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentRowId, setCurrentRowId] = useState();
  const header = ["Fonte", "Valor", "Data", ""];

  const init = async () => {
    await getRows().then((res) => {
      setNewRows(res);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      font: "",
      money: "",
      dueDate: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      font: data.font,
      value: parseInt(data.money),
      date: data.dueDate,
      isChecked: false,
      recurrent: data.recurrent,
    };
    edit
      ? await editRow(currentRowId, payload)
          .then(() => {
            init();
          })
          .finally(() => {
            setAddNewIncoming(false);
            setEdit(false);
            reset();
          })
      : await postRow(payload)
          .then(() => {
            init();
          })
          .finally(() => {
            setAddNewIncoming(false);
            reset();
          });
  };

  const handleClose = () => setAddNewIncoming(false);
  const newLine = () => {
    setAddNewIncoming(true);
  };

  const handleDelete = async (id) => {
    await deleteRow(id).then(() => init());
  };

  const toggleTask = async (row) => {
    const payload = {
      ...row,
      isChecked: !row.isChecked,
    };
    await editRow(row.id, payload).then(() => {
      init();
    });
  };

  const handleEdit = async (row) => {
    setValue("dueDate", row.date);
    setValue("font", row.font);
    setValue("money", row.value);
    setEdit(true);
    setCurrentRowId(row.id);
    setAddNewIncoming(true);
  };

  const handleCancel = () => {
    setAddNewIncoming(false);
    setEdit(false);
    reset();
  };

  return (
    <Grid className="grid_table">
      <TitleWithButtons
        title="Renda"
        handleClose={() => setDeleteActive(false)}
        handleDelete={() => setDeleteActive(true)}
        deleteActive={deleteActive}
        handleAdd={newLine}
      />
      <DefaultTable
        rows={newRows}
        rowsHeader={header}
        handleDelete={handleDelete}
        toggleTask={toggleTask}
        deleteActive={deleteActive}
        handleEdit={handleEdit}
      />
      <BasicModal
        open={addNewIncoming}
        handleClose={handleClose}
        title={edit ? "Edite sua renda" : "Adicione uma renda"}
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
                    views={["day", "month", "year"]}
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
            <Grid container justifyContent="space-between">
              <Button type="submit">Salvar</Button>
              <Button onClick={handleCancel}>Cancelar</Button>
            </Grid>
          </form>
        </Grid>
      </BasicModal>
    </Grid>
  );
}
