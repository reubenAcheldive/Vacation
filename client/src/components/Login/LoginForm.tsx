import React, { useContext } from "react";
import "./form.css";
import { LoginUser } from "../../Api-Calls/login";
import { Link } from "react-router-dom";
import { useForm } from "../Hook/useForm";
import { InputAdornment, TextField } from "@material-ui/core";
import PasswordSharpIcon from "@mui/icons-material/PasswordSharp";
import { setItemLocalStorage } from "../../LocalStoragFuncation/setItemLocalStorage";
import { informationAccessesLogin } from "../../modals/LoginModal/informationAccessesLogin.modal";
import { StateContext } from "../Context/StateContext";
import { Paper, Grid, Avatar, Button, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AccountCircle } from "@mui/icons-material";

export const LoginForm: React.FC<informationAccessesLogin> = () => {
  const { handelChange, errors, values } = useForm();

  const { setAppState, appState } = useContext(StateContext);

  const handelSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (
        Object.keys(errors).length === 0 &&
        Object.keys(values).length !== 0 &&
        values.userName.trim() !== "" &&
        values.password.trim() !== ""
      ) {
        const results = await LoginUser(values);

        setItemLocalStorage("jwt", results.data.jwt);

        setAppState({ ...appState, userData: results.data });
      } else {
        setAppState({
          ...appState,
          handelAlertError: "All field must completed",
        });
      }
    } catch (e: any) {
      setAppState({
        ...appState,
        handelAlertError: "The user And password don't match",
      });
    }

    //
  };
  const paperStyle = {
    padding: 20,
    height: "25rem",
    width: "18rem",
    margin: "20px auto",
    background: "#aee0ff",
  };
  const btnStyle = { margin: "8px 0" };
  const avatarStyle = { display: "inline-flex", backgroundColor: "blue" };
  const { password, userName } = errors;
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <Grid className="text-center">
          <Paper elevation={8} style={paperStyle}>
            <Grid className="text-center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In </h2>
            </Grid>

            <TextField
              id="input-with-icon-textfield"
              label={"Enter User Name"}
              variant="standard"
              name="userName"
              type="text"
              onChange={handelChange}
              error={userName ? true : false}
              helperText={userName ? `${userName}` : false}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              id="standard-basic"
              label="password"
              variant="standard"
              name="password"
              type="password"
              onChange={handelChange}
              error={password ? true : false}
              helperText={password ? `${password}` : false}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordSharpIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnStyle}
              fullWidth
            >
              Sign in
            </Button>

            <Typography>
              You dont have Account ?<Link to="/register-page">register</Link>
            </Typography>
          </Paper>
        </Grid>
      </form>
    </div>
  );
};
