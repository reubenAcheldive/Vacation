import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { LoginForm } from "./components/Login/LoginForm";

import { Navigator } from "./components/Navigator/Navigator";
import { FetchVacations } from "./components/VacationsCard/FetchVacations";
import "semantic-ui-css/semantic.min.css";

import { RegisterForm } from "./components/Register/RegisterForm";

import { checkAndVerifyJwt } from "./Api-Calls/checkJwt";
import { getItemLocalStorage } from "./LocalStoragFuncation/getItemLocalStorage";
import { AuthLogin } from "./modals/LoginModal/AuthLogin";
import { AppState, StateContext } from "./components/Context/StateContext";

import { Charts } from "./components/Charts/Charts";

import { setItemLocalStorage } from "./LocalStoragFuncation/setItemLocalStorage";
import { HandelAlertError } from "./components/Alert/HandelAlertError";

import Box from "@mui/material/Box";
import { Container } from "semantic-ui-react";

const App: React.FC = () => {
  const jwt: string = getItemLocalStorage("jwt");

  const [appState, setAppState] = useState<AppState>({
    userData: null,
    RegisterConfig: null,
    fetchVacations: [],
    createNewVacation: null,
    handelAlertError: null,
    addNewVacationBtn: null,
    removeVacationBtn: null,
  });
  useEffect(() => {
    // this use Effect check the authentication if the jwt is valid  
    if (jwt) {
      const verifyJwt = async () => {
        const verifyJwt: any = await checkAndVerifyJwt(jwt);

        if (verifyJwt) {
          const result = verifyJwt.data;
          const { isAdministrator, userName } = result?.tokenAfterDecoded;
          const { jwt } = verifyJwt.data;
          const results: AuthLogin = { isAdministrator, userName, jwt };

          setItemLocalStorage("jwt", jwt);
          setAppState({ ...appState, userData: results });
        }
      };
      verifyJwt();
    }
  }, []);

  return (
    <StateContext.Provider
      value={{ appState, setAppState: setAppState as any }}
    >
      <Container>
        <Box>
          <Router>
            <Navigator />

            {appState.handelAlertError && <HandelAlertError />}
            <Switch>
              <Route path="/login-page">
                {!appState.userData ? (
                  <LoginForm userName={""} password={""} />
                ) : (
                  <Redirect to="/vacations" />
                )}
              </Route>
              <Route path="/register-page">
                <RegisterForm />
              </Route>
              <Route path="/vacations">
                <FetchVacations
                  isUserName={appState.userData?.userName}
                  checkIn={""}
                  checkOut={""}
                  description={""}
                  id={0}
                  img={""}
                  price={0}
                  follow={0}
                  followId={0}
                  destination={""}
                />
              </Route>
              {appState.userData?.isAdministrator && (
                <Route path="/charts">
                  <Charts />
                </Route>
              )}
              <Route path="*">
                {appState.userData?.jwt ? (
                  <Redirect to="/vacations" />
                ) : (
                  <Redirect to="/login-page" />
                )}
              </Route>
            </Switch>
          </Router>
        </Box>
      </Container>
    </StateContext.Provider>
  );
};

export default App;
