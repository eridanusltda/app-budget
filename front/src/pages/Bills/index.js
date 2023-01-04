import React, { useEffect, useState } from "react";
import { Checkbox, Grid, TextField, InputLabel, Button } from "@mui/material";
import BasicModal from "../../components/Modal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { getBills, postBill, deleteBill, editBill } from "../../API/Bills.api";
import DefaultTable from "../../components/Table";
import TitleWithButtons from "../../components/TitleWithButtons";

export default function Bills() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bills, setBills] = useState([]);
  const [deleteActive, setDeleteActive] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentBillId, setCurrentBillId] = useState();
  const header = ["Conta", "Valor", "Prazo", ""];

  const init = async () => {
    await getBills().then((res) => {
      setBills(res);
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
    };
    edit
      ? await editBill(currentBillId, payload)
          .then(() => {
            init();
          })
          .finally(() => {
            setIsModalOpen(false);
            setEdit(false);
            reset();
          })
      : await postBill(payload)
          .then(() => {
            init();
          })
          .finally(() => {
            setIsModalOpen(false);
            reset();
          });
  };

  const handleClose = () => setIsModalOpen(false);
  const newLine = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteBill(id).then(() => init());
  };

  const toggleTask = async (row) => {
    const payload = {
      ...row,
      isChecked: !row.isChecked,
    };
    await editBill(row.id, payload).then(() => {
      init();
    });
  };

  const handleEdit = async (row) => {
    setValue("dueDate", row.date);
    setValue("font", row.font);
    setValue("money", row.value);
    setEdit(true);
    setCurrentBillId(row.id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEdit(false);
    reset();
  };

  return (
    <Grid className="grid_table">
      <TitleWithButtons
        title="Contas"
        handleCancel={() => setDeleteActive(false)}
        handleDelete={() => setDeleteActive(true)}
        deleteActive={deleteActive}
        handleAdd={newLine}
      />
      <DefaultTable
        rows={bills}
        rowsHeader={header}
        handleDelete={handleDelete}
        toggleTask={toggleTask}
        deleteActive={deleteActive}
        handleEdit={handleEdit}
      />
      <BasicModal
        open={isModalOpen}
        handleClose={handleClose}
        title={edit ? "Edite sua renda" : "Add sua nova renda"}
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
            <Grid container>
              <Button onClick={handleCancel}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </Grid>
          </form>
        </Grid>
      </BasicModal>
    </Grid>
  );
}
