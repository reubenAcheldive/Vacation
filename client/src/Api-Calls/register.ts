import instance from "./gateway";
import { RegisterInformation } from "../modals/RegisterModal/RegisterInformation.modal";
const urlApi: string = "/api/user";

export const registerUser = async (user: RegisterInformation) => {
  const data = await instance.post<RegisterInformation>(`${urlApi}/register`, user);
  return data;
};
