import { getItemLocalStorage } from "../../LocalStoragFuncation/getItemLocalStorage";
import { updateVacation } from "../../modals/FormUpdateVacation/FormUpdateVacation.modal";
import instance from "../gateway";
import { EditVacation } from "../../modals/VacationsModals/editVacation.modal";

export const editVacation = async (values: EditVacation) => {
  const token = getItemLocalStorage("jwt");
  const data = await instance.put<updateVacation>(
    `/api/vacation/edit-vacation`,
    values ,
    { headers: { Authorization: "Bearer " + token } }
  );

  return data;
};
