import { Router } from "express";
import {
  getAllCountriesHandler,
  getCountryByCodeHandler,
  getCountriesByRegionHandler,
  searchCountriesHandler
} from "../controllers/country.controller";

const router = Router();

router.get("/", getAllCountriesHandler);
router.get("/:code", getCountryByCodeHandler);
router.get("/region/:region", getCountriesByRegionHandler);
router.get("/search", searchCountriesHandler);

export default router;
