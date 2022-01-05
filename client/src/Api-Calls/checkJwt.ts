import { AuthLogin } from "../modals/LoginModal/AuthLogin";
import instance from "./gateway";
import { getItemLocalStorage } from "../LocalStoragFuncation/getItemLocalStorage";
const token = getItemLocalStorage("jwt");

export const checkAndVerifyJwt = async (jwt: string) => {
  const haveJwt = token ? token : jwt;
  try {
    const data = await instance.get<AuthLogin>(`/api/user/auth`, {
      headers: { Authorization: "Bearer " + haveJwt },
    });

    return data;
  } catch (er) {
    console.error({ er });
  }
};
