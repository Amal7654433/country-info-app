import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const REST_COUNTRIES_API = "https://www.apicountries.com/countries";
