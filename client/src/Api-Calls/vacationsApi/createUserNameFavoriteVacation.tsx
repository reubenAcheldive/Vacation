import { getItemLocalStorage } from "../../LocalStoragFuncation/getItemLocalStorage";
import instance from "../gateway";

export const createUserNameFavoriteVacation = async (
  userName: string,
  idVacation: string
) => {
  try {
    const token = getItemLocalStorage("jwt");

    const data = await instance.post(
      `api/vacation/add-new-favorite-vacation`,
      {
        userName,
        idVacation,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {

  }
};
