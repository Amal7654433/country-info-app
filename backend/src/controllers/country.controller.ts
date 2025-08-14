import { Request, Response, NextFunction } from "express";

import {
  getCountryByCode,
  getCountriesByRegion,
  searchCountries,
  getAllCountries,
} from "../services/country.service";
import ApiError from "../utils/ApiError";

export const getAllCountriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const countries = await getAllCountries();
    res.json(countries);
  } catch (err) {
    next(new ApiError(500, "Failed to fetch countries"));
  }
};

export const getCountryByCodeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
        console.log(req.params.code)
    const country = await getCountryByCode(req.params.code);

    res.json(country);
  } catch (err) {
    next(new ApiError(404, "Country not found"));
  }
};

export const getCountriesByRegionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const countries = await getCountriesByRegion(req.params.region);
    res.json(countries);
  } catch (err) {
    next(new ApiError(500, "Failed to fetch countries by region"));
  }
};

export const searchCountriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const countries = await searchCountries({
      name: req.query.name as string,
      capital: req.query.capital as string,
      region: req.query.region as string,
      timezone: req.query.timezone as string,
    });

    if (countries.length === 0) {
      return next(new ApiError(404, "No countries found"));
    }

    res.json(countries);
  } catch (err) {
    next(new ApiError(500, "Failed to search countries"));
  }
};
