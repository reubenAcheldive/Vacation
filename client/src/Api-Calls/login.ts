import instance from "./gateway";
import { informationAccessesLogin } from "../modals/LoginModal/informationAccessesLogin.modal";
import { AuthLogin } from "../modals/LoginModal/AuthLogin";

const urlApi: string = "/api/user";

export const LoginUser = async ({ userName, password }: informationAccessesLogin) => {
  const data = await instance.post<AuthLogin>(`${urlApi}/login`, {
    userName,
    password,
  });

  return data;
};
