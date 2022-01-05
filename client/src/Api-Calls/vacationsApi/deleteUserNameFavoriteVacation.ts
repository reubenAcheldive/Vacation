import { getItemLocalStorage } from "../../LocalStoragFuncation/getItemLocalStorage";
import instance from "../gateway";

export const deleteUserNameFavoriteVacation = async (
  idVacation: number,
  userName: string
) => {
  const token = getItemLocalStorage("jwt");
  const data = await instance.delete(`api/vacation/delete-favorite-vacation`, {
    data: { idVacation, userName },
    headers: { Authorization: "Bearer " + token },
  });

  return data;
};
