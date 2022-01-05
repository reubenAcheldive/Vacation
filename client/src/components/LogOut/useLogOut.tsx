import { useContext } from "react";

import { StateContext } from "../Context/StateContext";
import { useHistory } from "react-router-dom";

export const useLogOut = () => {
  const { appState, setAppState } = useContext(StateContext);
  const { userData } = appState;
  let history = useHistory();
  const redirect = () => {
    history.push("/login-page");
  };

  const logOutHandel = () => {
    if (userData) setAppState({ userData: null });
    localStorage.removeItem("jwt");
    redirect();
    return;
  };

  return {logOutHandel}
};
