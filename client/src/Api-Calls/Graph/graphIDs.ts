import { getItemLocalStorage } from "../../LocalStoragFuncation/getItemLocalStorage";
import instance from "../gateway";

export const graphIDs = async () => {
  try {
    const token = getItemLocalStorage("jwt");

    const data = await instance.get(
      `/api/vacation/get-graph-ids`,
      { headers: { Authorization: "Bearer " + token } }
      //  Authorization
    );

    return data;
  } catch (er) {
    return [];
  }
};
