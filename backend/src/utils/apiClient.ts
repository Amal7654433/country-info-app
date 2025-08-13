import axios from "axios";
import { REST_COUNTRIES_API } from "../config/env";

const apiClient = axios.create({
  baseURL: REST_COUNTRIES_API,
  timeout: 10000,
});

export default apiClient;
