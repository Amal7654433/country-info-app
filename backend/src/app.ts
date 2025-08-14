import express, { Application } from "express";
import cors from "cors";
import countryRoutes from "./routes/country.routes";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// app.get("/", (req, res) => {
//   res.send("Country Information API is running 🚀");
// });

app.use("/countries", countryRoutes);
app.use(errorHandler);
export default app;
