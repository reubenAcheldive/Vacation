import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useLogOut } from "../LogOut/useLogOut";
import { Link } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import { StateContext } from "../Context/StateContext";

export const Navigator = () => {
  const { appState } = React.useContext(StateContext);
  const { userData } = appState;
  const { logOutHandel } = useLogOut();
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "rgb(0 0 0 / 27%)" }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vacations
            {userData?.isAdministrator ? (
              <Button component={Link} to="/charts" color="inherit">
                charts
              </Button>
            ) : null}
            {userData?.isAdministrator ? (
              <Button component={Link} to="/vacations" color="inherit">
                vacations
              </Button>
            ) : null}
          </Typography>
          <ButtonGroup variant="text" color="error">
            {!userData?.jwt ? (
              <Button component={Link} to="/login-page" color="inherit">
                sing-in
              </Button>
            ) : (
              <Button color="inherit" onClick={() => logOutHandel()}>
                Log-out
              </Button>
            )}
            {userData ? (
              <Button color="inherit">
                {userData.isAdministrator
                  ? "welcome Admin"
                  : "welcome :" + userData.userName}
              </Button>
            ) : (
              <Button color="inherit">welcome guest</Button>
            )}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
