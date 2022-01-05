import { getItemLocalStorage } from "../../LocalStoragFuncation/getItemLocalStorage";
import instance from "../gateway";

export const updateFollow = async (id: number, follow: number) => {
  const token = getItemLocalStorage("jwt");
  try {
    const data = await instance.post<any>(
      `/api/vacation/set-new-follow`,
      {
        id,
        follow,
      },
      { headers: { Authorization: "Bearer " + token } }
    );

    return data;
  } catch (er) {
    return;
  }
};
