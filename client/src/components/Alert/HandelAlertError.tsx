import * as React from "react";
import Alert from "@mui/material/Alert";

import { StateContext } from "../Context/StateContext";
import { Stack } from "@mui/material";

export const HandelAlertError = () => {
  const { appState, setAppState } = React.useContext(StateContext);
  const { handelAlertError } = appState;
  React.useEffect(() => {
    setTimeout(() => {
      setAppState({ ...appState, handelAlertError: null });
    }, 4000);
  }, [handelAlertError]);
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert style={{backgroundColor: "#d32f2f",color: "#fff"}} variant="filled" severity="error">
        {handelAlertError}
      </Alert>
    </Stack>
  );
};
