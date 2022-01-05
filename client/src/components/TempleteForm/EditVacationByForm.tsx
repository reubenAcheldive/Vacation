import React, { useContext } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { Avatar, Button, Grid, Paper, TextField } from "@material-ui/core";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { editVacation } from "../../Api-Calls/vacationsApi/editVacation";
import { BtnModalShow } from "../Context/BtnModalShow";
import { StateContext } from "../Context/StateContext";
import { convertWithMoment } from "../../handelDateTimeToString";

import { useValidateError } from "../Hook/useValidateError";
import { updateVacation } from "../../modals/FormUpdateVacation/FormUpdateVacation.modal";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
export const EditVacationByForm = ({
  id,
  description,
  price,
  destination,
  img,
}: any) => {
  const detailFormUpdate: updateVacation = {
    destination,
    description,
    checkIn: new Date(),
    checkOut: new Date(),
    price,
    img,
  };

  const [values, setValues] = useState(detailFormUpdate);
  const { errors, validate } = useValidateError();
  const [startDate, setStartDate] = useState(new Date());
  const { appState } = useContext(StateContext);
  const { userData } = appState;

  const { handleClose } = useContext(BtnModalShow);
  const paperStyle = {
    padding: 20,
    height: "30rem",
    width: "40rem",
    margin: "20px auto",
  };
  const btnStyle = { margin: "8px 0" };
  const avatarStyle = { display: "inline-flex", backgroundColor: "blue" };
  const initialDate = detailFormUpdate.checkIn;

  const initialDateFromTheNextDay: any = new Date().setDate(
    new Date().getDate() + 1
  );
  const handelChange = (event: any): any => {
    const { name, value } = event.target;

    validate(name, value);

    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      userData &&
      Object.keys(errors).length === 0 &&
      Object.keys(values).length !== 0
    ) {
      const { isAdministrator, jwt } = userData;
      const { img, checkIn, checkOut, description, destination, price } =
        values;

      const startDateFormat = convertWithMoment(checkIn);
      const endDateFormat = convertWithMoment(checkOut);

      if (isAdministrator && jwt) {
        await editVacation({
          isAdmin: isAdministrator,
          description,
          price,
          checkIn:startDateFormat,
          checkOut: endDateFormat,
          id,
          jwt,
          img,
          destination,
        });
        handleClose();
      }
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="text-center"
            spacing={2}
          >
            <Paper elevation={8} style={paperStyle}>
              <Grid className="text-center">
                <Avatar style={avatarStyle}>
                  <EditIcon />
                </Avatar>
                <h2>Edit Vacation </h2>
              </Grid>
              <Grid item xs={2} md={4}>
                <TextField
                  required
                  label={"Enter destination"}
                  name="destination"
                  type="text"
                  placeholder="destination"
                  onChange={(e) => handelChange(e)}
                  variant="standard"
                  value={values.destination}
                  error={errors.destination ? true : false}
                  helperText={
                    errors.destination ? `${errors.destination}` : false
                  }
                />
              </Grid>
              <Grid item xs={2} md={4}>
                <TextField
                  required
                  type="text"
                  multiline
                  rows={2}
                  rowsMax={4}
                  label={"Enter description"}
                  name="description"
                  variant="standard"
                  value={values.description}
                  onChange={handelChange}
                  error={errors.description ? true : false}
                  helperText={
                    errors.description ? `${errors.description}` : false
                  }
                />
              </Grid>
              <Grid item xs={2} md={4}>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  name="startDate"
                  minDate={values.checkIn}
                  selected={values.checkIn}
                  onChange={(date: Date) =>
                    setValues({ ...values, checkIn: date })
                  }
                />

                <DatePicker
                  name="endDate"
                  minDate={initialDateFromTheNextDay}
                  selected={
                    values.checkOut < values.checkIn
                      ? values.checkIn
                      : values.checkOut
                  }
                  dateFormat="dd/MM/yyyy"
                  onChange={(date: Date) =>
                    setValues({ ...values, checkOut: date })
                  }
                />
              </Grid>
              <TextField
                required
                name="price"
                label={"Insert price"}
                type="number"
                placeholder="price"
                variant="standard"
                value={values.price}
                onChange={handelChange}
              />

              <TextField
                name="img"
                type="text"
                onChange={handelChange}
                label={"Pick a Picture"}
                variant="standard"
                value={values.img}
                error={errors.img ? true : false}
                helperText={errors.img ? `${errors.img}` : false}
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnStyle}
                fullWidth
              >
                Submit
              </Button>
            </Paper>
          </Grid>
        </form>
      </div>
    </div>
  );
};
