import { Request, Response } from "express";
import {
 
  getCountryByCode,
  getCountriesByRegion,
  searchCountries,
  getAllCountries
} from "../services/country.service";

export const getAllCountriesHandler = async (req: Request, res: Response) => {
  try {
    console.log('ehllow')
    const countries = await getAllCountries();
    console.log('countries',countries)
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch countries" });
  }
};

export const getCountryByCodeHandler = async (req: Request, res: Response) => {
  try {
    const country = await getCountryByCode(req.params.code);
    res.json(country);
  } catch (err) {
    res.status(404).json({ error: "Country not found" });
  }
};

export const getCountriesByRegionHandler = async (req: Request, res: Response) => {
  try {
    const countries = await getCountriesByRegion(req.params.region);
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch countries by region" });
  }
};

export const searchCountriesHandler = async (req: Request, res: Response) => {
  try {
    const countries = await searchCountries({
      name: req.query.name as string,
      capital: req.query.capital as string,
      region: req.query.region as string,
      timezone: req.query.timezone as string
    });

    if (countries.length === 0) {
      return res.status(404).json({ error: "No countries found" });
    }

    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: "Failed to search countries" });
  }
};
