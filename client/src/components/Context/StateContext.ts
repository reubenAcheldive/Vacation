import React from "react";

import { AuthLogin } from "../../modals/LoginModal/AuthLogin";
import { RegisterInformation } from "../../modals/RegisterModal/RegisterInformation.modal";
import { CreateNewVacation } from "../../modals/VacationsModals/CreateNewVacation.modal";
import { FetchVacation } from "../../modals/VacationsModals/FetchVacation.modal";

export interface AppState {
  userData: AuthLogin | null;
  RegisterConfig: RegisterInformation | null;
  fetchVacations: FetchVacation[];
  createNewVacation: CreateNewVacation | null;
  handelAlertError: string | null;
  addNewVacationBtn: null | boolean;
  removeVacationBtn: null | boolean;

}

interface Context {
  appState: AppState;
  setAppState: (state: Partial<AppState>) => any;
}

export const StateContext = React.createContext<Context>({
  appState: {} as any,
  setAppState: (appState: any) => null,
});
