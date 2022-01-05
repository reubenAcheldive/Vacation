import axios, { AxiosInstance } from "axios";

import { getItemLocalStorage } from "../LocalStoragFuncation/getItemLocalStorage";
const token = getItemLocalStorage("jwt");

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: { Authorization: "Bearer " + token },
});

export default instance;
