import instance from "../gateway";
import { CreateNewVacation } from "../../modals/VacationsModals/CreateNewVacation.modal";
import { getItemLocalStorage } from "../../LocalStoragFuncation/getItemLocalStorage";

export const createNewVacation = async (values: CreateNewVacation) => {
  console.log(values);

  try {
    const token = getItemLocalStorage("jwt");

    const data = await instance.post<CreateNewVacation>(
      `/api/vacation/create-new-vacation`,
       values ,
      { headers: { Authorization: "Bearer " + token } }
    );

    return data;
  } catch (er) {
    console.log(er);
  }
};
