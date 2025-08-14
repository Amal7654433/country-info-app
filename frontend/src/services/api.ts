import { API } from "../utils/axios";

export const fetchAllCountries = () => API.get("/countries");
export const fetchCountryByCode = (code: string) => API.get(`/countries/${code}`);
export const fetchCountriesByRegion = (region: string) => API.get(`/countries/region/${region}`);
export const searchCountries = (params: Record<string, string>) => API.get(`/countries/search`, { params });