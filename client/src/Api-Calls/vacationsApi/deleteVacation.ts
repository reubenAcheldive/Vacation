import { LoDashImplicitNumberArrayWrapper } from "lodash";
import { getItemLocalStorage } from "../../LocalStoragFuncation/getItemLocalStorage";
import instance from "../gateway";

export const deleteVacation = async (id: LoDashImplicitNumberArrayWrapper) => {
  try {
    const token = getItemLocalStorage("jwt");
    const data = await instance.delete(
      `/api/vacation/delete-vacation/${id}`,
      { headers: { Authorization: "Bearer " + token } }
    );

    return data;
  } catch (er) {}
};
