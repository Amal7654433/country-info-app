import apiClient from "../utils/apiClient";
import { cache } from "../utils/cache";

export interface Country {
  name: string;
  code: string;
  population: number;
  region: string;
  capital: string[];
  flag: string;
  currencies: string[];
  languages: string[];
  timezones: string[];
}

const mapCountryData = (data: any): Country => {
  return {
    name: data.name.common,
    code: data.cca2,
    population: data.population,
    region: data.region,
    capital: data.capital || [],
    flag: data.flags?.png || data.flags?.svg || "",
    currencies: data.currencies ? Object.keys(data.currencies) : [],
    languages: data.languages ? Object.values(data.languages) as string[] : [],
    timezones: data.timezones || []
  };
};

export const getAllCountries = async (): Promise<Country[]> => {
    console.log('hello world')
  const cacheKey = "allCountries";
  const cached = cache.get<Country[]>(cacheKey);

  if (cached) {
    return cached;
  }
console.log('2nd step finished')
  const res = await apiClient.get("/all");
  console.log(res,'this is response 3rd step')
  const countries = res.data.map(mapCountryData);
  cache.set(cacheKey, countries);
  return countries;
};

export const getCountryByCode = async (code: string): Promise<Country> => {
  const cacheKey = `country_${code.toUpperCase()}`;
  const cached = cache.get<Country>(cacheKey);

  if (cached) {
    return cached;
  }

  const res = await apiClient.get(`/alpha/${code}`);
  if (!res.data || res.data.length === 0) {
    throw new Error("Country not found");
  }

  const country = mapCountryData(res.data[0]);
  cache.set(cacheKey, country);
  return country;
};

export const getCountriesByRegion = async (region: string): Promise<Country[]> => {
  const cacheKey = `region_${region.toLowerCase()}`;
  const cached = cache.get<Country[]>(cacheKey);

  if (cached) {
    return cached;
  }

  const res = await apiClient.get(`/region/${region}`);
  const countries = res.data.map(mapCountryData);
  cache.set(cacheKey, countries);
  return countries;
};

export const searchCountries = async (filters: {
  name?: string;
  capital?: string;
  region?: string;
  timezone?: string;
}): Promise<Country[]> => {
  const cacheKey = `search_${JSON.stringify(filters)}`;
  const cached = cache.get<Country[]>(cacheKey);

  if (cached) {
    return cached;
  }

  let countries: any[] = [];

  if (filters.name) {
    const res = await apiClient.get(`/name/${filters.name}`);
    countries = res.data;
  } else {
    const res = await apiClient.get(`/all`);
    countries = res.data;
  }

  let filtered = countries;

  if (filters.capital) {
    filtered = filtered.filter(c =>
      c.capital?.some((cap: string) =>
        cap.toLowerCase().includes(filters.capital!.toLowerCase())
      )
    );
  }

  if (filters.region) {
    filtered = filtered.filter(c =>
      c.region.toLowerCase() === filters.region!.toLowerCase()
    );
  }

  if (filters.timezone) {
    filtered = filtered.filter(c =>
      c.timezones?.includes(filters.timezone!)
    );
  }

  const result = filtered.map(mapCountryData);
  cache.set(cacheKey, result);
  return result;
};
